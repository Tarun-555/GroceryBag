const nodemailer = require("nodemailer");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6bdd08add3288c",
      pass: "78d835a284c811"
    }
  });

exports.signUp=(req,res)=>{
    const {name,email,password} = req.body;

    User.findOne({email}).exec((err,user) => {
        if(err){
           return res.status(401).json({
               error : "Something went wrong!",
           });
        }

        if(user){
            return res.status(400).json({
                error:"Email already exists!"
            });
       }

       const token = jwt.sign(
           {name,email,password},
           process.env.JWT_ACCOUNT_ACTIVATION,
           {expiresIn : "10m"}
        );
           
        const activateLink = `${process.env.CLIENT_URL}/auth/activate/${token}`;

        const emailData = {
            to:[
                {
                    address: email,
                    name,
                }
            ],
            from:{
                address:process.env.EMAIL_FROM,
                name:"AUTH",
            },
            subject:"Account Acivation Link",
            html:`
            <div>
             <h1>Please click on the link to activate your account.</h1>
              <a href="${activateLink}" target="_blank">
              ${activateLink}
              </a>
              <hr/>
              <p>This email contains sensitive information</p>
              <a href="${process.env.CLIENT_URL}" target="_blank">
              ${process.env.CLIENT_URL}
              </a>
            </div>
            `,
        };

        transport.sendMail(emailData,(err,info)=>{
            if(err){
                return res.status(400).json({
                    error:err,
                });
            }
            
            res.json({
                message:`Email has been sent successfully to ${email}.
                Please follow the instructions sent to email to activate your account.`,
            });

        });
    });
 };

exports.activateAccount = (req,res) => {
    const { token } = req.body;

    if(token){
      return jwt.verify(token,
        process.env.JWT_ACCOUNT_ACTIVATION,
        (err)=>{
        if(err){
         return res.status(400).json({
         error:"The link has expired!"
        });
       };

    const {name,email,password}=jwt.decode(token);
    
    const newUser = new User({name,email,password});

     User.findOne({email}).exec((err,user)=>{

       if(err){
           return res.status(400).json({
               error:"Something went wrong!"
           });
       }

       if(user){
        return res.status(400).json({
            error:"The email already exists!"
        });
       }

       newUser.save((err,emailData)=>{
        if(err){
        return res.status(400).json({
            error:"Something went wrong!"
          });
         }

         res.json({
             message:`Hey ${ name } welcome to the applicaton`
         });
       
        });

      });

    });
   };

    return res.status(401).json({
        error:"The token is invalid!"
    });

 };

 exports.signIn = (req,res) => {
     const {email,password} = req.body;

     User.findOne({email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
               error:"User with specified mail doesnot exists"
            });
        }

        if(!user.authenticate(password)){
          return res.status(400).json({
              error:"Password is incorrect"
          })
        }

        const token = jwt.sign({_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"10d"});

        const {_id, name, role, email} = user;

        return res.json({
            token,
            user:{
                _id,
                name,
                role,
                email,
            },
            message:"signed in successfully!",
        });

     });
 };

 exports.forgot_password = (req,res) => {
   const { email } = req.body;

   User.findOne({email}).exec((err,user) =>{
      if(err || !user){
          return res.status(400).json({
            error: "User with mail doesnot exist!"
          });
      }

      const token = jwt.sign(
          {_id:user._id, name:user.name},
          process.env.JWT_RESET_PASSWORD,
          {expiresIn:"10m"},
        );

      const link = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

      const emailData={
          from:process.env.EMAIL_FROM,
          to:email,
          subject:"Reset Password Link",
          html:`
          <h1>Please use the following link to reset your password</h1>

          <a href="${link} target="_blank">${link}</a>
          `
      };

      user.updateOne({resetPasswordLink:token}).exec((err,success)=>{
          if(err){
              return res.satus(400).json({
                  error:"There was error in saving reset password link"
              });
          }

          transport.sendMail(emailData)
          .then(()=>{
              return res.json({
                 message:`The email was successfully sent to ${email}`
              });
          })
          .catch((err)=>{
              return res.status(400).json({
                  error:"There was error in sending an email"
              })
          })
      
      });

   });
 };

 exports.resetPassword = (req,res) => {
  const {resetPasswordLink, newPassword} = req.body;
 
  if(resetPasswordLink){
  jwt.verify(resetPasswordLink, 
    process.env.JWT_RESET_PASSWORD,(err)=>{
    if(err){
      return res.status(400).json({
          error:"the link expired.Try again!"
      });
    }
    
    User.findOne({resetPasswordLink}).exec((err,user) => {
      if(err){
        return res.status(400).json({
            error:"Something went wrong. Try later."
        });
      }

      const updateFields={
          password:newPassword,
          resetPasswordLink:''
        }

      user = _.extend(user,updateFields);  

      user.save((err)=>{
       if(err){
           return res.satus(400).json({
            error:"Error in reseting the password"
           });
       }

       return res.json({
           message:"your password got successfully reset."
       });

      })
    
    });

  });

  }

 };
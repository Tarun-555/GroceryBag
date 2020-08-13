const User = require("../models/auth");

exports.listUsers = (_,res) => {

    User.find({},{hashed_password:0, salt:0, resetPasswordLink}).exec(
        (err,user) => {
            if(err){
                return res.status(400).json({
                 error:"Something went Wrong,Please try again!"
                });
            }

            return res.json({
                result:users,
            });

        }
    )

}
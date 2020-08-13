const express = require("express");
const router = express.Router();
const { signUp, activateAccount,
     signIn, forgot_password,resetPassword} = require("../controllers/auth"); 

router.post("/signup",signUp);

router.post("/account-activation",activateAccount);

router.post("/signin",signIn);    

router.post("/forgot-password",forgot_password);
    
router.post("/reset-password",resetPassword);  

module.exports = router;
const {check} =require("express-validator");

const MIN = 8;

exports.signUpValidator = [
    check("name").not().isEmpty().withMessage("The name field can not be empty"),
    check("email").isEmail().withMessage("Must be a valid email"),
    check("password").length({min : MIN}).withMessage(`The password must be of ${MIN} characters long`)
];
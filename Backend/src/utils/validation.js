const validator = require("validator");
const validateSignupData = (req) =>
{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Enter the Name first");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("email address is not valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("password is not strong it must contain atleast 8 characters including 1 uppercase, 1 symbol and 1 number");
    }
}

const validateEditData = (req) =>
{
    const allowedUpdates = ["firstName","lastName","age","about","photoUrl","skills","gender"];
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedUpdates.includes(field));
    return isEditAllowed;
}
module.exports = {validateSignupData,validateEditData};
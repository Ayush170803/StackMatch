const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

const { validateSignupData } = require('../utils/validation');
const User = require('../Models/user');
const { userauth } = require('../Middlewares/auth');

authRouter.post('/signup', async (req, res) => {
  try {
    const {firstName,lastName,emailId,password}=req.body;
    validateSignupData(req);
    const passwordHash=await bcrypt.hash(password,10);

    const user=new User({firstName,lastName,emailId,password:passwordHash});
    const savedUser=await user.save();
    const token=await savedUser.getjwt();
    res.cookie("token",token,{
      httpOnly:true,
      maxAge: 8 * 60 * 60 * 1000, sameSite: "Lax",
    });
    res.json({
      message:"Data successfully saved in DB",
      data:savedUser,
    });
  }
  catch(err)
  {
     res.send("message"+err.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const {emailId,password}=req.body;
    const user=await User.findOne({ emailId });
    if (!user)return res.status(400).send("Invalid credentials");

    const isPasswordValid=await user.validatepassword(password);
    if (!isPasswordValid) return res.status(400).json({message:"Wrong password"});

    const token=await user.getjwt();

    res.cookie("token",token,{httpOnly:true, maxAge: 8 * 60 * 60 * 1000,sameSite: "Lax",});
    res.json({message: "Login successful",user,});
  } 
  catch(err)
  {
    res.status(400).send({message:err.message});
  }
});

authRouter.post('/logout',userauth,(req, res)=>
{
  res.cookie("token",null,{  expires: new Date(Date.now()),});
  res.json({ message: "User logged out successfully" });
});

module.exports = authRouter;

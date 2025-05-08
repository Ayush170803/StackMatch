const express = require("express");
const authRouter = express.Router();
const {validateSignupData} = require('../utils/validation');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const {userauth} = require('../Middlewares/auth');

authRouter.post('/signup', async (req,res)=>
  {   
 try
 {
   // console.log(req.body);
      const {firstName,lastName,emailId,password} = req.body;
      validateSignupData(req);
      const passwordHash = await bcrypt.hash(password,10);

      const user = new User({firstName, lastName, emailId, password:passwordHash });
      const saveduser = await user.save();

      const token= await saveduser.getjwt();
      res.cookie("token",token,{expires: new Date(Date.now()+8*3600000)});

      res.json(
        {
          message:"data successfully saved on db",
          data:saveduser
        });
    }
    catch(er)
    {
      res.send("message"+er.message)
    }
})

authRouter.post('/login',async (req,res)=>
    {
      try
      {
          const {emailId,password}=req.body;
          const user = await User.findOne({emailId:emailId});
          if(!user)
          {
            res.status(400).send("Invalid Credentials");
          }
        const ispasswordvalid = await user.validatepassword(password);
        if(ispasswordvalid)
        {
          const token= await user.getjwt();
          res.cookie("token",token,{expires: new Date(Date.now()+8*3600000)});
          res.json({
            message:"login Successful",
            user
          })
        }
        else
        {
          res.status(400).send("wrong password");
        }
      }
      catch(err)
      {
        res.status(400).send(err.message);
      }
    })

authRouter.post('/logout',userauth,async (req,res)=>
{
  res.cookie("token",null,{expires: new Date(Date.now())});
  res.send("user logged out succesful");
})

module.exports=authRouter;
const express = require("express");
const {validateEditData} = require('../utils/validation');
const profileRouter = express.Router();
const {userauth} = require('../Middlewares/auth');

profileRouter.get('/profile/view', userauth, async (req,res)=>
    {
      try
      {
      const userdetails = req.userdetails;
      res.send(userdetails);
      }
      catch(er)
      {
        res.send(er);
      }
    })
    

profileRouter.patch('/profile/edit',userauth, async (req,res)=>
{
try
{
 if(!validateEditData(req))
 {
  throw new Error("Invalid edit data");
 }

 const loggedinuser = req.userdetails;
 
 Object.keys(req.body).forEach(key=>{
  loggedinuser[key] = req.body[key];
 });

 await loggedinuser.save();
 res.json({message:"user updated successfully",data:loggedinuser});
}
catch(er)
{
  res.status(400).send("error:"+ er.messsage);
}
})
module.exports = profileRouter;
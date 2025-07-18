const express = require("express");
const {validateEditData} = require('../utils/validation');
const profileRouter = express.Router();
const {userauth} = require('../Middlewares/auth');
const User = require('../Models/user');

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

profileRouter.get('/profile/view/:friendId', userauth, async (req, res) => {
  try {
    const {friendId}=req.params;

    const friend=await User.findById(friendId).select('firstName lastName photoUrl gender age about skills');
    if(!friend)
    {
      return res.status(404).json({message:'user not found'});
    }
    res.json(friend);
  }
  catch(err)
  {
    console.error(err);
    res.status(500).json({ message:'Failed to fetch friend profile' });
  }
});

module.exports = profileRouter;
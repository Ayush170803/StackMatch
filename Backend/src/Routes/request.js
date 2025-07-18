const express = require('express');
const {userauth} = require('../Middlewares/auth');
const connection = require('../Models/connection');
const User = require('../Models/user');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId',userauth, async (req,res) =>
{
    try
    {
    const userdetails = req.userdetails;
    const fromUserId = userdetails._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedstatus = ["interested","ignored"];
    if(!allowedstatus.includes(status))
    {
        return res.status(400).json({
            message:"Invalid Status Type"
        })
    }
    if(fromUserId.toString()===toUserId.toString())
    {
        return res.status(400).json({message: "Cannot send request to yourself"});
    }
    const existingreq = await connection.findOne({
        $or:[{fromUserId:fromUserId,toUserId:toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},]
    })

    if(existingreq)
    {
        throw new Error("Request Already Exists")
    }

const userexists=await User.findById(toUserId);

if(!userexists)
{
    return res.status(400).json({message:"User Doesn't Exists wrong id"});
}
    const connectionrequest=new connection({fromUserId,toUserId,status});
    const data=await connectionrequest.save();
    res.json({message:"connection request sent successfully",data})
    }

    catch(er)
    {
        res.status(400).send(er.message);
    } 
})

requestRouter.post('/request/review/:status/:requestId',userauth, async(req,res)=>
{
    try
    {
        const loggedinuser=req.userdetails;
        const requestId=req.params.requestId;
        const allowedstatus=["accepted","rejected"];
        const isallowed=allowedstatus.includes(req.params.status);

        if(!isallowed)
        {
            return res.status(400).json({message:"Invalid Status Type"})
        }
        const isconnectionrequest=await connection.findOne({_id:requestId,toUserId:loggedinuser._id,status:"interested"});
        if(!isconnectionrequest)
        {
            return res.status(404).json({message:"No Request EXISTS"})
        }
        isconnectionrequest.status=req.params.status;
        const data=await isconnectionrequest.save();
        res.json({message:"connection request "+req.params.status})
    }
    catch(er)
    {
        res.send(er.message);
    }
})
module.exports=requestRouter;
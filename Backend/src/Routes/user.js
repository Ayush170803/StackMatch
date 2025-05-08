const express = require('express');
const { userauth } = require('../Middlewares/auth');
const userRouter = express.Router();
const connectionrequest = require('../Models/connection');
const user = require('../Models/user');
userRouter.get('/user/requests',userauth,async (req,res)=>
{
    try{
        const loggedinuser = req.userdetails;
        const allrequests = await connectionrequest.find({
            toUserId:loggedinuser._id,
            status:"interested"}).populate("fromUserId",["firstName","lastName","gender","photoUrl","skills","age","about"]);
        res.send(allrequests);
    }
    catch(er)
    {
        res.statusCode(400).send(er.message);
    }
})

userRouter.get('/user/connections',userauth,async (req,res)=>
{
    try
    {   
        const loggedinuser = req.userdetails;
        const data = await connectionrequest.find({
            $or:[{fromUserId:loggedinuser._id ,status:"accepted"},
                {toUserId:loggedinuser._id,status:"accepted"}]
        }).populate("fromUserId",["firstName","lastName","gender","photoUrl","skills","age","about"]).populate("toUserId",["firstName","lastName","gender","photoUrl","skills","age","about"]);
        const newdata = data.map((value)=>
        {
            if(value.fromUserId._id.toString() === loggedinuser._id.toString())
                {
                    return value.toUserId;
                } 
            else
            {
                return value.fromUserId;
            }
        })
        res.send(newdata);
    }
    catch(er)
    {
        res.status(400).send("Error: "+er.message);
    }
})

userRouter.get('/feed',userauth, async (req,res)=>
{
    try{
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 30;  
        limit = limit > 50 ? 50 : limit;

    const loggedinuser = req.userdetails;
    const data = await connectionrequest.find(
        {
            $or:[{fromUserId:loggedinuser._id},
                {toUserId:loggedinuser._id}]
        }
    ).select("fromUserId toUserId");
    const usersToHide = data.map((value)=>
    {
        if(loggedinuser._id.toString()!= value.fromUserId.toString())
        {
            return value.fromUserId;
        }
        else 
        {
            return value.toUserId;
        }
    })
   
    const users = await user.find({
        _id: {
            $nin: [...new Set([...usersToHide.map(id => id.toString())])],
            $ne: loggedinuser._id
        }
    }).select("firstName lastName age gender skills about photoUrl").skip(limit * (page - 1)).limit(limit)
    res.send(users)
    }
    catch(er)
    {
        res.status(404).json({"Error Message":er.message});
    }
})
module.exports=userRouter;
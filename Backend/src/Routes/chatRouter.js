const express = require("express");
const router = express.Router();
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const Connection = require("../Models/connection");
const { userauth } = require("../Middlewares/auth");
 
router.post("/create/:receiverId", userauth, async (req, res) => {
  try
  {
    const senderId=req.userdetails._id;
    const receiverId=req.params.receiverId;
    if(senderId===receiverId)
    {
      return res.status(400).json({message:"Cannot chat with yourself"});
    }
    const isConnected=await Connection.findOne({
        $or:[{ fromUserId: senderId, toUserId: receiverId, status: "accepted" },
        { fromUserId: receiverId, toUserId: senderId, status: "accepted" },],
    });
    if(!isConnected)
    {
      return res.status(403).json({message:"You are not connected with this user"});
    }
    let chat=await Chat.findOne({members:{$all:[senderId,receiverId]}});

    if (!chat)
    {
      chat=new Chat({members:[senderId,receiverId]});
      await chat.save();
    }
    res.status(200).json(chat);
  } 
  catch(err)
  {
    console.error("Chat creation failed:", err);
    res.status(500).json({message:"Internal server error" });
  }
});

router.post("/send",userauth,async (req, res)=>
{
  try {
    const senderId=req.userdetails._id;
    const {to,message}=req.body;
    let chat=await Chat.findOne({members:{$all:[senderId,to]}});

    if(!chat)
    {
      const isConnected=await Connection.findOne({
        $or:[ { fromUserId: senderId, toUserId: to, status: "accepted" },
          { fromUserId: to, toUserId: senderId, status: "accepted" },],
      });

      if(!isConnected)
      {
        return res.status(403).json({message:"Not connected with this user"});
      }
      chat=new Chat({ members:[senderId,to] });
      await chat.save();
    }

    const msg=new Message({ chatId:chat._id, sender: senderId, text: message,});
    await msg.save();
    res.status(201).json({ message:{...msg._doc,fromSelf:true}});
  }
  catch(err)
  {
    console.error("Message sending failed:",err.message);
    res.status(500).json({message: "Internal server error" });
  }
});

router.get("/messages/with/:friendId", userauth, async (req,res) => 
{
  try
  {
    const userId=req.userdetails._id;
    const friendId=req.params.friendId;

    const chat=await Chat.findOne({
      members:{$all: [userId,friendId] },});

    if(!chat)
    {
      return res.status(200).json({ messages:[] });
    }

    const messages=await Message.find({chatId:chat._id}).sort({createdAt:1});

    const formatted=messages.map((msg)=>({
      ...msg._doc,
      fromSelf:msg.sender.toString()===userId.toString(),
    }));

    res.status(200).json({ messages: formatted });
  } 
  catch(err) 
  {
    console.error("Fetching messages failed:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

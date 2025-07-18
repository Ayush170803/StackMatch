import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Chat.css';
const Chat = () => {

  const {friendId} = useParams(); 
  const [friendProfile, setFriendProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');

  useEffect(()=>
    {
    const fetchProfile = async () =>
    {
      try
      {
        const res=await axios.get(`http://localhost:3000/profile/view/${friendId}`,{withCredentials: true});
        setFriendProfile(res.data);
      }
      catch(err)
      {
        console.error('Error fetching profile', err);
      }
    };

    const getOrCreateChat = async () => {
      try
      {
        const res=await axios.post(`http://localhost:3000/chat/create/${friendId}`,{},{ withCredentials: true });
        setChatId(res.data._id);
      }
      catch(err) 
      {
        console.error('Error creating or getting chat',err);
      }
    };
    fetchProfile();
    getOrCreateChat();
  }, [friendId]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res=await axios.post(`http://localhost:3000/chat/send`,{to:friendId, message },{withCredentials:true});
      setMessages((prev) => [...prev, res.data]);
      setMessage('');
    } 
    catch(err) 
    {
      console.error('Error sending message', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res=await axios.get(`http://localhost:3000/chat/messages/with/${friendId}`,{withCredentials:true});
      setMessages(res.data.messages);
    } 
    catch(err)
    {
      console.error('Error fetching messages',err);
    }
  };

  useEffect(()=>{
    fetchMessages();
    const interval=setInterval(fetchMessages,3000);
    return ()=>clearInterval(interval);
  },[chatId]);

  return(
  <div className="chat-container">
    <div className="chat-header">Chat with {friendProfile?.firstName}</div>
    <div className="messages-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.fromSelf ? 'from-self' : 'from-friend'}`}>{msg.text}</div>
      ))}
    </div>

    <div className="chat-input">
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..."/>
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
};

export default Chat;

const express = require("express");
const connectdb = require("./config/database");
const app = express();

const http = require("http"); 
const server = http.createServer(app);
const {Server} = require("socket.io");

const cookieParser = require('cookie-parser');
const cors = require ('cors');


const authRouter = require('./Routes/auth');
const profileRouter = require('./Routes/profile');
const requestRouter = require('./Routes/request');
const userRouter = require("./Routes/user");
const chatRouter = require('./Routes/chatRouter');

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true 
}));

app.use(express.json()); 
app.use(cookieParser());


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/chat',chatRouter);

const io = new Server(server,{
  cors:{
    origin:'http://localhost:5173',
    credentials:true,
  }
});

io.on('connection',(socket)=>
{
  console.log("New user connected");
  socket.on('sendMessage',(message)=>{
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect',()=>
  {
    console.log("User disconnected");
  });
});

app.set('io',io);

connectdb().then(()=>
  {
    console.log("successfully connected to db");
    app.listen(3000,()=>
    {
      console.log("server started at 3000");
    });
  }).catch((error)=>
  {
    console.log("database not connected"+error);
  });
 


const express = require("express");
const connectdb = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require ('cors');

const authRouter = require('./Routes/auth');
const profileRouter = require('./Routes/profile');
const requestRouter = require('./Routes/request');
const userRouter = require("./Routes/user");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json()); 
app.use(cookieParser());


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectdb().then(() => {
    console.log("successfully connected to db");

    app.listen(3000, () => {
      console.log("server started at 3000");
    });
  })
  .catch((error) => {
    console.log("database not connected" + error);
  });
 


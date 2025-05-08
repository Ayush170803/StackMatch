const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromUserId: {type: mongoose.Schema.Types.ObjectId,required:true, ref:"User"}, // ref will create a link between two tables USER and connection schema
        toUserId: {type: mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
        status:
        {
            type:String,
            enum:{
            values:["accepted","rejected","ignored","interested"],
            message:`{VALUE} wrong value`,
            required:true
        }},
    },
    { timestamps: true }
)
connectionSchema.index({fromUserId:1,toUserId:1});

module.exports = mongoose.model("connection",connectionSchema);
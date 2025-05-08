// create a user schema and mongoose model
const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema =new mongoose.Schema(
{
  firstName:{ type: String , required:true},
  lastName: { type: String },
  emailId:  { type: String, required:true, unique:true, lowercase:true, trim:true,
    validate(value)
    {
      if(!validator.isEmail(value))
      {
        throw new Error("Wrong Email input");
      }
    }
  },
  password: { type: String, required:true,
    validate(value)
    {
      if(!validator.isStrongPassword(value))
      {
        throw new Error("minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
      }
    }
  },
  age: { type: Number,   min: [10,'Study More Kid']},
  about:{type: String, default:"Stacking solutions, overflowing love 💻❤️"},
  photoUrl:{type: String, default:"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?rs=1&pid=ImgDetMain",
    validate(value)
    {
      if(!validator.isURL(value))
      {
        throw new Error("Wrong Image Link");
      }
    }
  },

  skills:{type: [String],
    validate:{validator: function(value)
    {
        return value.length<=30;
    },
    message:"skills must not exceed 30"
    }
  },
  gender: { type: String, validate(value){  
    if(!["male","female","other"].includes(value))
    {
      throw new Error("Gender is not Valid");
    }
    }, lowercase:true},
},
{ timestamps: true }
);

userSchema.index({firstName:1,lastName:1});

userSchema.methods.getjwt = async function()
{
  const user=this; 
  const token = await jwt.sign({_id:user._id},"MYSECRETKEY",{ expiresIn: '1h' });
  return token;
}

userSchema.methods.validatepassword = async function(passwordInputByUser)
{
  const user=this;
  const passwordHash = user.password;
  const ispasswordvalid=await bcrypt.compare(passwordInputByUser,passwordHash);
  return ispasswordvalid;
}
module.exports = mongoose.model("User",userSchema); // User naam ka model on top of userSchema


const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;


const userSchema = new mongoose.Schema ({
    username:{
      type : String,
      required : true,
      unique : true,
    },
    email:{
      type : String,
      required : true,
      unique : true,
        
    },
    password:{
      type : String,
      required : [true , "password is required"],
    },
    date:{
        type : Date,
        default : Date.now
    }
})
  
module.exports = mongoose.model("user" , userSchema );
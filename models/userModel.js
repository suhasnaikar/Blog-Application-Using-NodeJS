const mongoose = require("mongoose")
// Model & Scheme Creation\
const userSchema = new mongoose.Schema({    
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
// const User = module.exports = mongoose.model("User",userSchema)
const User = mongoose.model("User",userSchema)
module.exports.User = User;
module.exports.UserSchema = userSchema;
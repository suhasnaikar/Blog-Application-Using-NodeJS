const mongoose = require("mongoose")
const { MongoClient, ObjectId } = require('mongodb');
// var ObjectId = mongoose.Schema.Types.ObjectId;
const {User,UserSchema} = require('./userModel');
// Model & Scheme Creation\
const blogSchema = new mongoose.Schema({    
    user:{
        type:ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:"NA"
    },
    description:{
        type:String,
        required:true
    },
    created_at: {
        type: Date, 
        default: Date.now
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }
})
// const User = module.exports = mongoose.model("User",userSchema)
const Blog = mongoose.model("BLog",blogSchema)
module.exports.Blog = Blog;
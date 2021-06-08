const express = require("express");
const router = express.Router();
const { User } = require('../models/userModel');
const { Blog } = require('../models/blogModel');

router.get("/",function(req,res){            
Blog.aggregate([
  {"$sort":{created_at:-1}},
  { "$lookup": {
    "from": "users",
    "let": { "user": "$user" },
    "pipeline": [
      { "$match": { "$expr": { "$eq": ["$_id", "$$user"] }}}
    ],
    "as": "user"
  }},
  { "$addFields": { 
    "user": { "$arrayElemAt": ["$user.fullname", 0] }
  }}
],function(err, blogData) {  
    res.render("index",{blogData:blogData})
})  
})



router.get("/singleblog/:title",function(req,res){
Blog.aggregate([    
  { $match: { slug: req.params.title} },
  { "$lookup": {
    "from": "users",
    "let": { "user": "$user" },
    "pipeline": [      
      { "$match": { "$expr": { "$eq": ["$_id", "$$user"]}}}
    ],
    "as": "user"
  }},
  { "$addFields": { 
    "user": { "$arrayElemAt": ["$user.fullname", 0] }
  }}
],function(errr, blogData) {    
    res.render("singleblog",{blogData:blogData})
})  
})
module.exports = router;
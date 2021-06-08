const express = require('express');
const router = express.Router();
const { validationResult  } = require('express-validator');
const { User } = require('../models/userModel');
const { Blog } = require('../models/blogModel');
const validator = require('../validation/validator');
const upload = require('../image_upload/uploadImage');
const slugify = require('slugify')

router.get("/view",function(req,res){        
    const user_id = req.user._id        
    Blog.find({"user":user_id}).sort({ created_at: -1 }).populate('User').exec(function(err,blogData){        
        if(err){
            req.flash("Danger","Records Not Found")            
        }else{  
            res.render("blog/view",{blogData:blogData})
        }
    })
})

router.get("/add",function(req,res){
    res.render("blog/add")
})


router.post("/add",validator.validate('createBlog'),function(req,res){        
    const {title,description} = req.body        
    const formData= {
        title: title,
        description: description        
    }
    if(req.user){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                
        res.render("blog/add",{errors: errors.array(),formData:formData})
    }
    else{                                                    
        const blog = Blog({
            user:req.user,
            title:title,
            description:description,
            slug:slugify(title)
        })
        blog.save()            
        req.flash('success','Post Added Successfully')                                 
        res.redirect("/blogs/view")
    }
    }
})


router.get("/upload_image/:blog_id",function(req,res){
    const blog_id = req.params.blog_id
    res.render("blog/upload_image",{blog_id:blog_id})
});


router.post("/upload_image",upload.single('image'),function(req,res){    
    if(req.file == undefined){
        req.flash("danger","No File Selecred")
        res.redirect('/blogs/upload_image/'+req.body.blog_id);
    } else {
        Blog.updateOne({_id:req.body.blog_id},{image:req.file.filename},function(err){
        if(err){
            req.flash("danger","Image Not Uploaded")
        }else{
            req.flash("success","Image Uploaded")
            res.redirect("/blogs/view")
        }
        })
    }
});


router.get("/edit/:blog_id",function(req,res){
    const blog_id = req.params.blog_id
    Blog.findOne({_id:blog_id},function(err,blogData){
    if(err){
        req.flash("danger","Record Found")
    }
    else{                        
        res.render("blog/edit",{blogData:blogData})
    }
    });
});

router.post("/edit/:blog_id",validator.validate('createBlog'),function(req,res){        
    const {title,description,blog_id} = req.body            
    const blogData={        
        _id:blog_id
    }
    const formData= {
        _id:blog_id,
        title: title,
        description: description        
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                
        res.render("blog/edit",{errors: errors.array(),formData:formData})
    }
    else{                 
        Blog.updateOne({_id:blog_id},{title:title,slug:slugify(title),description:description},function(err){
          if(err){
            req.flash("danger","Record Not Updated")
        }else
        {
            req.flash("success","Record Updated")
            res.redirect("/blogs/view")
        }
    })                                           
    }
})


router.get("/delete/:blog_id",function(req,res){
    const blog_id = req.params.blog_id
    Blog.deleteOne({_id:blog_id},function(err,blogData){
    if(err){
        req.flash("danger","Record Not Deleted")
    }
    else{           
        req.flash("success","Record Deleted")
        res.redirect("/blogs/view")
    }
    });
});


router.get("/details/:blog_id",function(req,res){
    const blog_id = req.params.blog_id
    Blog.findOne({_id:blog_id},function(err,blogData){
    if(err){
        req.flash("danger","Record Found")
    }
    else{                        
        res.render("blog/details",{blog:blogData})
    }
    });
});


module.exports = router;
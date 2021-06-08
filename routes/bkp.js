const express = require('express');
const router = express.Router();
const { validationResult  } = require('express-validator');
const { User } = require('../models/userModel');
const validator = require('../validation/validator');
const upload = require('../cust/uploadImage');

router.get("/view",function(req,res){
    res.render("blog/view")
})

router.get("/add",function(req,res){
    res.render("blog/add")
})


router.post('/add',upload.single('image'),validator.validate('createBlog'),function(req, res){               
    //   if(req.file == undefined){
    //     req.flash("danger","No File Selecred")
    //     res.render('blog/add');
    //   } else {
        const {title,image,description} = req.body        
        const formData= {
        title: title,
        image: image,                
        description: description,                        
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            res.render("blog/add",{errors: errors.array(),formData:formData})
        }
        req.flash("success","File Uploaded")
        res.render('blog/add');        
});

// router.post('/add',function(req, res){        
//   upload(req, res, (err) => {      
//     if(err){
//         req.flash("danger",err)
//         res.render('blog/add');
//     }else {
//       if(req.file == undefined){
//         req.flash("danger","Image File is Required")   
//         res.render('blog/add');
//       } else{
//         validator.validate('createBlog')
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log(errors)
//             res.render("blog/add",{errors: errors.array()})
//         }
//         console.log(req.file.filename)        
//       }
//     }
//   });
// });





module.exports = router;
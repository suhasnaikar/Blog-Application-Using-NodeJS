const express = require('express');
const router = express.Router();
const { validationResult  } = require('express-validator');
const { User } = require('../models/userModel');
const validator = require('../validation/validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get("/login",function(req,res){
    res.render("login")
})
router.get("/register",function(req,res){
    res.render("register")
})

// Register New User
router.post("/register",validator.validate('createUser'),function(req,res){        
    const {fullname,email,password,confirm_password} = req.body        
    const formData= {
        fullname: fullname,
        email: email,        
        password: password,        
        confirm_password: confirm_password,        
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {        
        res.render("register",{errors: errors.array(),formData:formData})
    }
    else{                                            
        const salt = bcrypt.genSaltSync(10);                
        const register = User({
            fullname:fullname,
            email:email,
            password:bcrypt.hashSync(password, salt)
        })
        register.save()            
        req.flash('success','User Registered Successfully')                                 
        res.render("login")
    }
})


// Login Process
router.post('/login',function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/blogs/view',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// // logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
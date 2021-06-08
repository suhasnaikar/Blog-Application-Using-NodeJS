const { check,body } = require('express-validator')
const { User } = require('../models/userModel');


exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        check('fullname','Fullname is Required').notEmpty(),
        check('email','Email is Required').notEmpty()
            .custom((value) => {
                return User.findOne({email: value}).then(user => {
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                });
            }),        
        check('password','password is Required').notEmpty(),                     
        check('confirm_password').custom((value, { req }) => {          
          if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
          }
          else{
            return true;
          }
          
      })
       ]        
    }
    break;
    case 'createBlog':{
      return[
        check('title','Title is Required').notEmpty(),       
        check('description','Description is Required').notEmpty()
      ]
    }

  }
}


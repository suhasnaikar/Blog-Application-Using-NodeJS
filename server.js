require('dotenv').config();
const express = require("express")
const path = require("path");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const conectDB = require("./config/database");
const connectDB = require("./config/database");
var bodyParser = require('body-parser');
const router = express.Router();
// Connect To Database
connectDB();
// Initialize the Application
const app = express();
// Set the View Engine 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Set Public Folder for Templating, Styles & Js Files
app.use(express.static(path.join(__dirname, 'public')));
// Public Folder
// app.use(express.static('./public'));
// Express Session Middleware
app.use(session({
  secret: 'SomeRandomSecretKey',
  resave: true,
  saveUninitialized: true
}));
// Passport Config
require('./middleware/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('*', function (req, res, next) {    
  res.locals.user = req.user || null;  
  next();
});
app.get('*', function (req, res, next) {    
  res.locals.user = req.user || null;  
  next();
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'UnAthourized Access! Please login');
    res.redirect('/users/login');
  }
}
// function isAuthenticated(req, res, next) {  
//   res.locals.user = req.user || null;
//   if (res.locals.user)
//       // res.locals.user = req.user || null;
//       return next();  
//   res.redirect('/');
// }

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Route Files for Home Data
let home = require('./routes/homeRoute');
app.use('/', home);
// Route Files for User Register & Login
let users = require('./routes/userRoute');
app.use('/users', users);
// Authenticated Route Files for Blogs of User
let blogs = require('./routes/blogRoute');
app.use('/blogs',ensureAuthenticated, blogs);
// app.use('/blogs', blogs);


// Run the App on Default Port 3000
app.listen(process.env.PORT,()=>{
    console.log("Server Started on Port "+process.env.PORT)
})


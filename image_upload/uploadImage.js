const multer = require('multer');
const path = require('path');
var appDir = path.dirname(require.main.filename);
const storage = multer.diskStorage({
  destination: path.join(appDir,'/public/uploads'),  
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ 
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){    
    checkFileType(file, cb);
  }
})

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


module.exports = upload; 



// const multer = require('multer');
// const path = require('path');
// var appDir = path.dirname(require.main.filename);
// // console.log(appDir+"")
// // console.log(path.join(appDir,'/public/uploads'))
// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: path.join(appDir,'/public/uploads'),  
//   // destination: 'C:/Users/naika/desktop/NODE_DEVELOPMENT/11_BLOG_APPLICATION/public/uploads/',  
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){    
//     checkFileType(file, cb);
//   }
// }).single('image');

// // Check File Type
// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// module.exports = upload; 




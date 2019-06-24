const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken')
const verfiyToken = require('./tokenVerfication')
const bcrypt = require('bcrypt')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: '../public/upload',
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
/********************upload image *********************/

// upload a static file (img)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) { // the folder where multer try to store all incoming files
//         cb(null, '../public/upload/');
//     },
//     filename: function (req, file, cb) { //the saving name 
//         cb(null, file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {

//     if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     }
//     // reject a file
//     else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 //(5MB)
//     },
//     fileFilter: fileFilter
// });

/***************get routes ****************************/
router.get('/',verfiyToken,(req, res) => {
  console.log('req')
  //   userModel.find({}).then(data => {
  //     res.send(data)
  //   })
  // })
  userModel.find()
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.set("content-type", "application/json");
      res.status(200).send(data);
      console.log('Sent list of users');

    })
})
  /************************************ ****************/
  /***************post routs ***************************/

  router.post('/img_data',upload.single('photo'), (req, res)=> {
    console.log(req)
    if (req.file) {
      console.log("image came");
      res.send("done");
    }
    else res.send("failed");
  
  })

  router.post('/login', (req, res) => {
  console.log(req.body.data.password)
  let nationalId = req.body.data.nationalId;
  let password = req.body.data.password;
  let promise = userModel.findOne({ nationalId: nationalId }).exec();
  promise.then(function (data) {
    if(data.role=="user")
    {
      console.log(data)
   
    if (data.isValid(password)) {
      let token = jwt.sign({ role: data.role }, 'secret',{expiresIn : '12h'});
     console.log(token)
      res.json(token)
    }
    else {
     res.send("invalid password")
    }
  }else{
    res.send("no such a user")
  }
  })

  })

  router.post('/login/admin', (req, res) => {
    console.log(req.body.data.password)
    let nationalId = req.body.data.nationalId;
    let password = req.body.data.password;
    let promise = userModel.findOne({ nationalId: nationalId }).exec();
    promise.then(function (data) {
      if(data.role=="admin")
      {
        console.log(data)
      if (data.isValid(password)) {
        let token = jwt.sign({ role: data.role }, 'secret',{expiresIn : '12h'});
       console.log(token)
        res.json(token)
      }
      else {
       res.send("invalid password")
      }
    }else{
      res.send("no such a user")
    }
    })
  
    })
  


  router.post('/reg',upload.single('image'),(req, res) => {
    console.log(req.headers)
    console.log(req.body);
    
    userModel.find({nationalId: req.body.nationalId}).exec()
      .then(user =>{
         // to create users with only unique email
        if (user.length >= 1) {
          // console.log("3added el users " + user.length);
            //conflict 
          return res.status(409).json({message: "user already exists "})}
        else {
          let password = req.body.password;
              const user = new userModel({
                _id: new mongoose.Types.ObjectId(),
                userName: req.body.UserName,
                Password:  userModel.hashThePassword(password),
                nationalId: req.body.nationalId,
                userImg: req.body.userImg,
                role:"user"})
                user.save().then(result => {
                  res.status(201).json({
                    message: "user created",
                    result: result});})
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  })})}
          });
        })
    



  /************************************* */

router.post('/up',(req,res)=>{

console.log(req.body);
console.log(req.data);
})

  module.exports = router;
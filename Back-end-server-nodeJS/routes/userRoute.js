const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken')
const verfiyToken = require('./tokenVerfication')
const bcrypt = require('bcrypt')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/upload',
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
router.get('/', (req, res) => {
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

router.post('/img_data', verfiyToken, upload.single('photo'), (req, res) => {
  console.log(req)
  if (req.file) {
    console.log("image came");
    res.send("done");
  }
  else res.send("failed");

})

router.post('/login', (req, res) => {
  console.log(req.body.data)
  let userName = req.body.data.userName;
  let password = req.body.data.password;
  userModel.findOne({ userName: userName })
    .then((data) => {
      if (data === null) {
        return res.send("userError")
      }
      if(password == null) return res.send("passwordError")  

      if (data.role == "user") {
        if (data.isValid(password)) {
          let token = jwt.sign({ role: data.role }, 'secret', { expiresIn: '12h' });
          res.json(token)
        }
        else {
          res.send("passwordError")
        }
      }
    })
})

router.post('/login/admin', (req, res) => {
  console.log(req.body)
  let nationalId = req.body.data.nationalId;
  let password = req.body.data.password;
  userModel.findOne({ nationalId: nationalId })
    .then((data) => {
      console.log(data)
      if (data === null) {
          return res.send("userError")
      }
      if(password == null) return res.send("passwordError")  
      if (data.role == "admin") {

        if (data.isValid(password)) {
          let token = jwt.sign({ role: data.role }, 'secret', { expiresIn: '12h' });
          res.json(token)
        }
        else {
          res.send("passwordError")
        }
      }
    })

})

router.post('/admin', (req, res) => {

  const newAdmin = req.body;
  newAdmin.Password = userModel.hashThePassword(newAdmin.Password)
  console.log(newAdmin);

  const admin = new userModel(newAdmin);
  admin.save()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.send(err);
    })

})

router.post('/reg', verfiyToken, upload.single('image'), (req, res) => {
  console.log(req.headers)
  console.log(req.body);

  userModel.find({ nationalId: req.body.newUser.nationalId }).exec()
    .then(user => {
      // to create users with only unique email
      if (user.length >= 1) {
        // console.log("3added el users " + user.length);
        //conflict 
        return res.status(409).json({ message: "user already exists " })
      }
      else {
        let password = req.body.newUser.Password;
        const user = new userModel({
          _id: new mongoose.Types.ObjectId(),
          userName: req.body.newUser.UserName,
          Password: userModel.hashThePassword(password),
          nationalId: req.body.newUser.nationalId,
          userImg: req.body.newUser.userImg,
          role: "user"
        })
        user.save().then(result => {
          res.status(201).json({
            message: "user created",
            result: result
          });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            })
          })
      }
    });
})

/************************************* */

/************************Edit User*************************/
// Defined edit route
router.get('/edit/:id', verfiyToken, (req, res) => {
  let id = req.params.id;

  userModel.findById(id, function (err, data) {
    res.json(data);
  });
});

//  Defined update route
router.post('/update/:id', verfiyToken, (req, res) => {
  userModel.findById(req.params.id, function (err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
      // / user.Password

      console.log("edit ");

      console.log(req.body);

      user.nationalId = req.body.nationalId;
      user.userName = req.body.userName;
      user.Password = user.Password

      console.log(user);

      user.save()
        .then(user => {
          console.log(user);
          res.json('Update complete');
        })
        .catch(err => {
          console.log(err);

          res.status(400).send("unable to update the database");
        });
    }
  });
});

/************************delete user********************* */

router.get('/delete/:id', verfiyToken, (req, res) => {
  userModel.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

/************************************* */

module.exports = router;
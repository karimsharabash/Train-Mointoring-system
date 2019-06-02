const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken')
const verfiyToken=require('./tokenVerfication')
/***************get routes ****************************/
router.get('/',verfiyToken,(req, res) => {
  console.log('req')
  userModel.find({}).then(data => {
    res.send(data)
  })
})
/************************************ ****************/
/***************post routs ***************************/

router.post('/login', (req, res) => {
  let nationalId = req.body.data.nationalId;
  let password = req.body.data.password;
  let promise = userModel.findOne({ nationalId: nationalId }).exec();
  promise.then(function (data) {
    if(data)
    {
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

router.post('/reg', (req, res) => {
  let nationalId = req.body.nationalId;
  let password = req.body.password;
  let role = req.body.role;
  console.log(req.body)
  user = new userModel({
    nationalId: nationalId,
    Password: userModel.hashThePassword(password),
    role: role
  })
  user.save().then(data => {
    console.log(data)
    res.send("done")
  })
})

  //check if this national id already assigned with a user assigned with
router.post('/nationalId', verfiyToken,(req, res) => {
  userModel.find({ nationalId: req.body.data.nationalId }, (data, err) => {
    if (err) throw err;
    if (data == []) {
      res.send("valid national")
    }
    else {
      res.send("already exist")
    }

  })
})



/************************************* */

module.exports = router;
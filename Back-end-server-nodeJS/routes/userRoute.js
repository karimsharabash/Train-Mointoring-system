const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt=require('bcrypt')
const jws=require('jsonwebtoken')

router.post('/login', (req, res, next) => {
    let userName = req.body.name;
    let password=req.body.password;
   
   user=new userModel(userName)
   user.save().then(data=>{
       console.log(data)
   })
  })


router.get('/',(req,res)=>{
    userModel.find({}).then(data=>{
        console.log(data)
    })
})

  module.exports = router;
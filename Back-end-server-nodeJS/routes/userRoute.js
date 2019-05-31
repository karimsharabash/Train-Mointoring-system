const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jws=require('jsonwebtoken')

router.post('/login', (req, res) => {
    let userName = req.body.data.name;
    let password=req.body.data.password;
    let promise = userModel.findOne({userName:userName}).exec();
    
    promise.then(function(data){
        if(data.isValid(password)){
         let token = jws.sign({userName:data.userName},'secret', {expiresIn : '3h'});
         console.log(token)
         res.json(token)
        }
        else
        {
            res.send("invalid password")
        }

    })
  })
router.post('/nationalId',(req,res)=>{
    userModel.find({userName:req.body.userName},(data,err)=>{
        if (err) throw err;
        if(data==[]){
             res.send("valid national")
        }
        else{
            res.send("national found")
        }

    })
})
router.post('/reg',(req,res)=>{
    let userName = req.body.userName;
    let password=req.body.password;
    console.log(req.body)
   user=new userModel({
    userName:userName,
    Password:userModel.hashThePassword(password)
   })
   user.save().then(data=>{
       console.log(data)
       res.send("done")
   })


})

router.get('/',(req,res)=>{
    userModel.find({}).then(data=>{
        console.log(data)
    })
})

router.get('/adduser', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
  })

  var decodedToken='';
  function verifyToken(req,res,next){
    let token = req.query.token;
  
    jwt.verify(token,'secret', function(err, tokendata){
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }

  module.exports = router;
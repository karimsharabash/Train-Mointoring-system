const express = require("express");
const mongooseTrain= require('./ConnectionToDatabase/trainDb');

const app = express();
const body_parser = require('body-parser');
const path = require("path");
const tripRout = require("./routes/trip")
const userRoute = require("./routes/userRoute")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

  
/*********************Routes********************/
app.use("/trip",tripRout);
app.use("/user",userRoute);
/**********************************************/



app.listen(5000, () => {
    console.log('started server on port 5000')
  });
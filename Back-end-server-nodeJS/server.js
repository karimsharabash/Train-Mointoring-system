const express = require("express");
const mongooseTrain= require('./ConnectionToDatabase/trainDb');
const mqtt = require('mqtt')
const app = express();
const body_parser = require('body-parser');
const path = require("path");
const tripRout = require("./routes/trip")
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.post('/user',(req,res)=>{

  console.log(req.body)
})

/*************************** USING MQTT *********/
//connection to the broker default tcp port on ubuntu 
const  serverClient = mqtt.connect('mqtt://localhost:1883');

serverClient.on('connect', () => {
    serverClient.subscribe('test')
   })
// mosquitto_pub -m "message from mosquitto_pub client" -t "test" try to test  
serverClient.on('message', (topic, message) => {
        // stringfiy  the message to see it 
    console.log(message.toString())
    }
  )
/****************************************************/
  
/*********************Routes********************/
app.use("/trip",tripRout);

/**********************************************/
app.listen(5000, () => {
    console.log('started server on port 5000')
  });
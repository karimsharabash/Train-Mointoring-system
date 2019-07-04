const express = require("express");
const mongooseTrain= require('./ConnectionToDatabase/trainDb');
// const mqtt = require('mqtt')
const app = express();
const body_parser = require('body-parser');
const path = require("path");
const tripRout = require("./routes/trip")
const userRoute = require("./routes/userRoute")
const driverRoute = require("./routes/driverRoute")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/*************************** USING MQTT *********/
//connection to the broker default tcp port on ubuntu 
// const  serverClient = mqtt.connect('mqtt://localhost:1883');

// serverClient.on('connect', () => {
//     serverClient.subscribe('test')
//    })
// // mosquitto_pub -m "message from mosquitto_pub client" -t "test" try to test  
// serverClient.on('message', (topic, message) => {
//         // stringfiy  the message to see it 
//     console.log(message.toString())
//     }
//   )
/****************************************************/
  
/*********************Routes********************/
app.use("/trip",tripRout);
app.use("/user",userRoute);
app.use("/driver",driverRoute);
/**********************************************/



app.listen(5000, () => {
    console.log('started server on port 5000')
  });

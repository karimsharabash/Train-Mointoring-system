const express = require("express");
const router = express.Router();
const tripModel = require("../models/trip");
const mqtt = require('mqtt')

/*************************** USING MQTT *********/
//connection to the broker default tcp port on ubuntu 
options={
    clientId:"server",
    username:"karim",
    password:"12345",
    clean:true};
const  serverClient = mqtt.connect('mqtt://localhost:1883',options);

serverClient.on('connect', () => {
    console.log("connected to cloudMqtt")
   })
// mosquitto_pub -m "message from mosquitto_pub client" -t "test" try to test  
serverClient.on('message', (topic, message) => {
        // stringfiy  the message to see it 
    console.log(message.toString())
    }
  )

  /*

  client.publish(topic, message, [options], [callback])
  */
/****************************************************/

router.post("/",(req,res)=>
{
  let newTrip = req.body;
  newTrip.startDate=Date.now();
  const trip = new tripModel(newTrip);
    trip.save()
    .then((savedTrip)=>{
        serverClient.publish(savedTrip.trainId.toString(), savedTrip._id.toString())
        
    })
    
  res.status(200).send({message:"done"});
})

router.post("/newPoint/:id",(req,res)=>{
    const tripId=req.params.id;
    const newPoint = req.body;
    tripModel.findOne({_id:tripId},"points",(err,trip)=>{
        console.log(trip);
        trip.points.push(newPoint);
        trip.save();
    })
    res.status(200).send({message:"done"});
})

router.get("/lastPoint/:id",(req,res)=>{
    const tripId=req.params.id;
    tripModel.findOne({_id:tripId},"points",(err,trip)=>{
        console.log(trip);
        const tripPoints=trip.points;
        res.status(200).send( tripPoints[tripPoints.length -1]);
    })
})

router.get('/:id',(req,res)=>
{
    const tripId = req.params.id;
    tripModel.find({_id:tripId},(err,trip)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(trip);
    })
})


router.get("/",(req,res)=>{
    
    tripModel.find()
    .exec((err,trips)=>
    {
        if(err) return res.status(400).send(err);
        res.set("content-type","application/json");
        res.status(200).send(trips);
    })
}) 

router.delete("/",(req,res)=>{
    tripModel.deleteMany()
    .then(()=>
    {
        res.status(200).send({message:"done"})
    })
})
module.exports = router;


const express = require("express");
const router = express.Router();
const tripModel = require("../models/trip");
const mqtt = require('mqtt')
const geolib = require('geolib');
const verfiyToken = require('./tokenVerfication')
/*************************** USING MQTT *********/
//connection to the broker default tcp port on ubuntu 
options={
    clientId:"server",
    username:"karim",
    password:"12345",
    clean:true};
const  serverClient = mqtt.connect('tcp://postman.cloudmqtt.com:18800',options);

serverClient.on('connect', () => {
    console.log("connected to cloudMqtt")
   })
// mosquitto_pub -m "message from mosquitto_pub client" -t "test" try to test  
serverClient.on('message', (topic, message) => {
        // stringfiy  the message to see it 
    console.log(message.toString())
    if(topic=="train/newPoint")
    {
        console.log(message);
        let newPoint={};
        const tripId=message.id;
        newPoint.motorTemp = message.temp;
         newPoint.pointTimestamp=Date.now();
         newPoint.longitude = 31.022;
         newPoint.latitude =  30.0788;
    tripModel.findOne({_id:tripId},"points",(err,trip)=>{
        if(trip.points.length !=0){
        let distance = geolib.getDistance(newPoint.location , trip.points[trip.points.length -1].location ) /1000 //calculate the distance between the last two points in KM
        let time =parseInt( newPoint.pointTimestamp -  trip.points[trip.points.length -1].pointTimestamp ) /1000 /60/60; // calculate the time difference between the last two points in minutes
        console.log(time);
        console.log(distance);
        newPoint.speed = distance/ time;
        }
        else{
            newPoint.speed = 0;
        }
        trip.points.push(newPoint);
        trip.save();
   
        // parseInt((date2 - date1)
    })
    res.status(200).send({message:"done"});
    }
    }
  )

  /*

  client.publish(topic, message, [options], [callback])
  */
/****************************************************/

router.post("/",verfiyToken,(req,res)=>
{
  let newTrip = req.body;
  console.log(newTrip)
  newTrip.startDate=Date.now();

//   newTrip.location.longitude=31.00767;
//   newTrip.location.latitude=30.57108;

  const trip = new tripModel(newTrip);
    trip.save()
    .then((data)=>{
        serverClient.publish(data.trainId, data._id.toString())
    })
    
  res.status(200).send({message:"done"});
})

router.post("/newPoint/:id",verfiyToken,(req,res)=>{
    const tripId=req.params.id;
    const newPoint = req.body;
    newPoint.pointTimestamp=Date.now();
    tripModel.findOne({_id:tripId},"points",(err,trip)=>{
        if(trip.points.length !=0){
        let distance = geolib.getDistance(newPoint.location , trip.points[trip.points.length -1].location ) /1000 //calculate the distance between the last two points in KM
        let time =parseInt( newPoint.pointTimestamp -  trip.points[trip.points.length -1].pointTimestamp ) /1000 /60/60; // calculate the time difference between the last two points in minutes
        console.log(time);
        console.log(distance);
        newPoint.speed = distance/ time;
        }
        else{
            newPoint.speed = 0;
        }
        trip.points.push(newPoint);
        trip.save();
   
        // parseInt((date2 - date1)
    })
    res.status(200).send({message:"done"});
})

router.get("/lastPoint",verfiyToken,(req,res)=>{
    tripModel.find((err,trips)=>{
       trips= trips.filter((trip=>{
            const pointsLength= trip.points.length ;
            if(pointsLength!=0){
            let points=trip.points[pointsLength -1 ]
            trip.points = points;
            return true;
            }else{
             return false;
            }
        }))
        res.status(200).send(trips );   
     })
})

<<<<<<< HEAD
router.get('/:id',verfiyToken,(req,res)=>
{
=======
router.get('/:id',(req,res)=>
{   
    console.log("hey")
>>>>>>> d74f0c193837a31ce7931b0991535a2526cb5197
    const tripId = req.params.id;
    tripModel.findOne({_id:tripId},(err,trip)=>{
        console.log(trip)
        if(err) return res.status(400).send(err);
        res.status(200).send(trip);
    })
})


router.get("/",verfiyToken,(req,res)=>{
    
    tripModel.find()
    .exec((err,trips)=>
    {
        if(err) return res.status(400).send(err);
        res.set("content-type","application/json");
        res.status(200).send(trips);
    })
})

router.delete("/",verfiyToken,(req,res)=>{
    tripModel.deleteMany()
    .then(()=>
    {
        res.status(200).send({message:"done"})
    })
})
module.exports = router;


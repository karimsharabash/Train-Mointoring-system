const express = require("express");
const router = express.Router();
const tripModel = require("../models/trip");

router.post("/",(req,res)=>
{
  let newTrip = req.body;

  newTrip.startDate=Date.now();
  newTrip.location={
    longitude:31.00767,
    latitude:30.57108
  }
//   newTrip.location.longitude=31.00767;
//   newTrip.location.latitude=30.57108;

  const trip = new tripModel(newTrip);
    trip.save((err,data)=>{
        if(err) return res.status(200).send(err);
        console.log(data)})
    
    res.status(200).send({message:"done"});
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


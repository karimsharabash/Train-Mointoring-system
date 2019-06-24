const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const driverModel = require('../models/driver');

/***************get routes ****************************/
router.get('/', (req, res) => {
  console.log('req')
  driverModel.find()
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      console.log(data)
      res.set("content-type", "application/json");
      res.status(200).send(data);
      console.log('Sent list of Drivers');
      console.log(data)

    })
})
/************************************ ****************/
/***************post routes ***************************/
router.post('/reg', (req, res) => {
  console.log(req);

  driverModel.find({
    nationalId: req.body.newDriver.nationalId
  })
    .exec()
    .then(driver => {

      // to create users with only unique national Id
      if (driver.length >= 1) {
        return res.status(409).json({
          message: "driver already exists "
        })

      } else {
        const driver = new driverModel({
          _id: new mongoose.Types.ObjectId(),
          driverName: req.body.newDriver.driverName,
          phoneNumber: req.body.newDriver.phoneNumber,
          nationalId: req.body.newDriver.nationalId,
        })

        driver.save()
          .then(result => {
            res.status(201).json({
              message: "driver created",
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
    })

})




/************************************* */

module.exports = router;
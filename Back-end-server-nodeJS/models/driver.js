const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const driverSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  driverName:{
      type: String,
     required: true,
  },
  nationalId: {
      type: String,
      required: true,
      unique: true,
  },
  phoneNumber: {
      type: Number,
      required: true
  },
 })

driverSchema.plugin(uniqueValidator);
const driverModel = mongoose.model('driver', driverSchema);
module.exports = driverModel;


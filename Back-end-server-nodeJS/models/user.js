const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName: { type: String },
  // firstName: String,
  // NationalId:Number,
  // email: { type: String, unique: true, required : true },
  hashPassword:{type: String,required : true},
  // image: String,
  // privileges:[{type:String,required:true}],
 })

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  userName: { type: String },
  // firstName: String,
  // NationalId:Number,
  // email: { type: String, unique: true, required : true },
  Password:{type: String,required : true},
  // image: String,
  // privileges:[{type:String,required:true}],
 })
 userSchema.statics.hashThePassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}
userSchema.methods.isValid = function(hashedpassword){
  return  bcrypt.compareSync(hashedpassword,this.Password);
}
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


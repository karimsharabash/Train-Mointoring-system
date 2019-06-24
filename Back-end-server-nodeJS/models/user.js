const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName:{
      type: String,
     required: true,
  },
  nationalId: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true
  },
  userImg: {
      type: String,
    //   default: 'images/user.png'
      // required: true
  },
  role: { type: String,
      enum: ['admin', 'user'] }
 })
 userSchema.statics.hashThePassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
  }
  userSchema.methods.isValid = function(hashedpassword){
    console.log("the password is "+hashedpassword)
    console.log(this)
  console.log("the password is "+this.password)
    return  bcrypt.compareSync(hashedpassword,this.password);
  }
userSchema.plugin(uniqueValidator);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


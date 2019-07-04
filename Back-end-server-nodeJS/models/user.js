const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({

  userName:{
      type: String,
     required: true,
  },
  nationalId: {
      type: String,
      required: true,
      unique: true,
  },
  Password: {
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
    console.log("the passwordzz is "+this.Password)
    return  bcrypt.compareSync(hashedpassword,this.Password);
  }
userSchema.plugin(uniqueValidator);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


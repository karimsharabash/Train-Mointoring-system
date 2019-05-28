const mongooseuser = require("mongoose");

mongooseuser.connect('mongodb://localhost:27017/UsersDb', () => {
    console.log("connected to users database");
})

module.exports = mongooseuser
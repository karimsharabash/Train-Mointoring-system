const mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/TrainDb', () => {
    console.log("connected to  train database");
})

module.exports = mongoose
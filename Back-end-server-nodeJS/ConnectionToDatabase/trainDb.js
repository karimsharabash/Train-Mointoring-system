const mongooseTrain= require("mongoose");
mongooseTrain.connect('mongodb://localhost:27017/TrainDb', () => {
    console.log("connected to  train database");
})

module.exports = mongooseTrain
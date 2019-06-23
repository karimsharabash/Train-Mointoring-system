const mongoose= require("mongoose");
// mongoose.connect('mongodb://localhost:27017/TrainDb', () => {
//     console.log("connected to  train database");
// })
mongoose
  .connect(
    "mongodb://localhost:27017/TrainDb"
  )
  .then(() => {
    console.log("Connected to train database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
mongoose.Promise = global.Promise;

module.exports = mongoose
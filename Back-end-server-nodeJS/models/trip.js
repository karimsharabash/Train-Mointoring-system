const mongoose = require("mongoose")
const tripSchema = mongoose.Schema({
    trainId: {
        type: String,
        require: true
    },
    location: {
        longitude: Number,
        latitude: Number
    },
    vibrationLevel: {
        type: String,
        enum: ['low', 'normal', 'high', 'extreme']
    },
    driverID: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        // ref: "Authors",
        required: true
    },
    date: { type: Date, default: Date.now },
    startDate :{type:Date}
})

const tripModel = mongoose.model('Trips',tripSchema)
module.exports = tripModel; 
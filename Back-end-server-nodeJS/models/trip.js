const mongoose = require("mongoose")
const tripSchema = mongoose.Schema({
    trainId: {
        type: String,
        require: true
    },
    driverID: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        // ref: "Authors",
        required: true
    },
    source:{            //source Station
        type:String,
        required:true
    },
    dest:{              //destination Station
        type:String,
        required:true
    },
    startDate :{type:Date},
    points:[{
        location: {
            longitude: Number,
            latitude: Number
        },
        vibrationLevel: {
            type: String,
            enum: ['low', 'normal', 'high', 'extreme']
        },
        motorTemp:{
            type:Number
        }
    }]
})

const tripModel = mongoose.model('Trips',tripSchema)
module.exports = tripModel; 
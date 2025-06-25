import mongoose from "mongoose";



const journeySchema = new mongoose.Schema({

    from:{type:String},
    to:{type:String},
    dateOfJourney:{type:String},
    modeOfTravel:{type:String}
})

const requestSchema = new mongoose.Schema({
    requestId:{type:String},
    userId:{type:String},
    journeys:{type:[journeySchema]},
    status:{type:String ,default:"pending..."},
    flowPosition:{type:Number , default:1},
    approved:{type:Boolean , default:false}
},
    {
        timestamps:true
    }
)


const TicketRequest = mongoose.model("TickerRequest" , requestSchema)

export default TicketRequest
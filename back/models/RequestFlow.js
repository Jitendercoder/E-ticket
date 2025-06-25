import mongoose from "mongoose";

const flowSchema = new mongoose.Schema({
    flowId:{type:String},
    userId:{type:String},
    stepNumber:{type:Number , min:1 , unique:true},
    role:{type:String}
})

const RequestFlow = mongoose.model("RequestFlow" , flowSchema)

export default RequestFlow
import RequestFlow from "../models/RequestFlow.js";
import User from "../models/User.js";
import { updateRole } from "./UserController.js";


const addFlow = async(req,res)=>{
    let { username , stepNumber , role }  = req.body
    const newFlowId = await RequestFlow.countDocuments() + 10000

    const user = await User.findOneAndUpdate({username},{$set:{role}})
    .then(value=>{
        if(!value){
            return res.status(200).send({
                success:false,
                data:{},
                message:"username is wrong"
            })
        }


         RequestFlow.create({flowId:newFlowId , userId:value.userId, stepNumber,role})
    .then(value=>{
         return res.status(200).send({
            success:true,
            data:value,
            message:"Flow added successfully"
        })
    }).catch(error=>{
         return res.status(200).send({
            success:false,
            data:value,
            message:"Flow not added"
        })
    })
    })



   
}

const getFlowByStepNumber = async (req,res)=>{
    const {number} = req.params

    RequestFlow.findOne({stepNumber:number})
    .then(value=>{
        if(!value){
            return res.status(200).send({
            success:false,
            data:{},
            message:"Request flow  not found"
            })
        }
        return res.status(200).send({
            success:true,
            data:value,
            message:"Request flow found"
        })
    }).catch(error=>{
        return res.status(200).send({
            success:false,
            data:{},
            message:"Request flow not found"
        })
    })
}

const getFlowByUserId = ()=>{

}


const getMaxFlow  = async(req ,res)=>{
    console.log("inside max")
    const maxFlow = await RequestFlow.find().sort({stepNumber:-1}).limit(1)
    .then(value=>{
        return res.status(200).send({
        data:value
    })
    }).catch(error=>{
        console.log("error => "+error.message)
    })
   
}


export {
    getFlowByStepNumber,
    addFlow,
    getFlowByUserId,
    getMaxFlow
}
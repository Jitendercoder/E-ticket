import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
    userId:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    gender:{type:String},
    email:{type:String},
    mobile:{type:String},
    address:{type:String}
})


const UserInfo = mongoose.model("UserInfo" , UserInfoSchema)
export default UserInfo
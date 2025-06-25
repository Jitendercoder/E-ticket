import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    userId:{type:String},
    username:{type:String,unique:true},
    password:{type:String},
    role:{type:String ,default:"User"}
})


const User = mongoose.model("User" , UserSchema)

export default User
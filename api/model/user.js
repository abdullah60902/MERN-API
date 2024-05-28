const  mongoose = require("mongoose")
const { model } = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
Name:String,
    email:String,
    password:String,
    phone:Number,
    gender:String,
})


module.exports=model("user",userSchema)

const  mongoose =require('mongoose')
const Studentsechema = new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
username:String,
father:String,
Roll:Number,
classname:String,








})
module.exports=mongoose.model('Student',Studentsechema)
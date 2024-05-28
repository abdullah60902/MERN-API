const mongoose =require('mongoose');
const  ImgSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    photo:String
})
module.exports=mongoose.model('img',ImgSchema)
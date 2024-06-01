const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Img = require('../model/img');
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name:'dnukjgsdg',
    api_key:'418862945832447',
    api_secret:'aozGdyIc3kDPyPtiAkCQumfE6vs'
  });

  router.post('/',(req,res,next)=>{
    const file = req.files.photo
    console.log(file);
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        const img = new Img({
            _id:new mongoose.Types.ObjectId,
            photo:result.url
        });
        img.save()
        .then(result=>{
            res.status(200).json({
                new_img:result
            })
        }).catch(err=>{
            res.status(500).json({
                error:err,
                msg:"not work"

            })
        })
        
    })
  })

  router.get('/',(req,res,next)=>{
    Img.find()
    .then(result=>{
        res.status(200).json({
            img_new:result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err,
            
        })
    })
  })
  router.get('/:id',(req,res,next)=>{
const _id = req.params.id
    Img.findById(_id)
    .then(result=>{
        res.status(200).json({
            new_img:result,
        })
    }).catch(err=>{
        res.status(500).json({
            error:err,
        })
    })
  })


  router.put('/:id',(req,res,next)=>{
    const file= req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
    Img.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            photo:result.url

        }
    })    .then(result=>{
        res.status(200).json({
          updated_category:result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
  })

  })
  router.delete('/',(req, res, next) => {
    const imageUrl = req.query.imageUrl;
    const urlArray = imageUrl.split('/');
    console.log(urlArray)
    const image = urlArray[urlArray.length - 1]
    console.log(image)
    const imageName = image.split('.')[0]
    console.log(imageName)
    categoryId = req.query.id;
    Img.findByIdAndDelete({ _id: categoryId })
        .then(result => {
            cloudinary.uploader.destroy(imageName,(error,tyuo)=>{
                console.log(tyuo);
            })
            res.status(200).json({
                message: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
  })

module.exports=router


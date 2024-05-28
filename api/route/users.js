const express =require('express');
const router =express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/signup',(req,res,next)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{
    if (err) {
        return res.status(500).json({
            error:err
        })
        
    }else{
        const user = new User({
            _id:new mongoose.Types.ObjectId,
            Name:req.body.Name,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
gender:req.body.gender
        })
        user.save()
        .then(result=>{
            res.status(200).json({
                new_user:result
            });
            
        }).catch(err=>{
            res.status(500).json({
                error:err,
                msg:"not complete"
            })
        })
    }
})




})

router.post('/login',(req,res,next)=>{
    User.find({Name:req.body.Name})
    .then(user=>{
        if (user.length<1) {
           return(res.status(401).json({
            msg:"user not exist"
           })) 

            
        }bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
if (err) {
    return(res.status(401).json({
        msg:"password is invalid"
    }))
}else {
    const token =jwt.sign({
Name:user[0].Name,
email:user[0].email,
phone:user[0].phone,
gender:user[0].gender

    },"do you know",{
    
        expiresIn:"24h"
    })
    res.status(200).json({
        Name:user[0].Name,
email:user[0].email,
phone:user[0].phone,
gender:user[0].gender,
token:token
    })
    
}
        })

    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})




module.exports=router
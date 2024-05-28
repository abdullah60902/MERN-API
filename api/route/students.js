const express =require('express');
const router = express.Router();
const Student = require('../model/student');
const { default: mongoose, set } = require('mongoose');
const CheckAuth = require('../middleware/Checj-Auth')
router.get("/",(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
Studentdata:result

        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
router.post("/",CheckAuth,(req,res,next)=>{
    const student =  new Student ({
        _id:new mongoose.Types.ObjectId,
        username:req.body.username,
        father:req.body.father,
        Roll:req.body.Roll,
        classname:req.body.classname,


    }) 
    student.save()
    .then(result=>{
        res.status(200).json({
       newresult:result     
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get("/:id",(req,res,next)=>{
     Student.findById(req.params.id)
     .then(result=>{
        res.status(200).json({
            student:result
        })
     }).catch(err=>{
        res.status(500).json({
            error:err
        })
     })

})



router.put("/:id", (req, res, next) => {
    Student.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                username: req.body.username,
                father: req.body.father,
                Roll: req.body.Roll,
                classname: req.body.classname
            }
        },
    
    ).then(result => {
        res.status(200).json({
            updateresult: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err,
            msg: "missing"
        });
    });
});





router.delete("/:id",(req,res,next)=>{
    Student.deleteOne({_id:req.params.id})
.then(result=>{
    res.status(200).json({
        result:result,
        msg:"dseleted sucessful"

    })
}).catch(err=>{
res.status(500).json({
    error:err,
    msg:"not deleted"
})
})


})


module.exports=router
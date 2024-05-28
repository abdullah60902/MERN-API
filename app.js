const express = require('express');
const Student = require('./api/route/students')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./api/route/users')
const Img = require('./api/route/img')
const fileUpload = require('express-fileupload')
const cors = require('cors')

mongoose.connect('mongodb+srv://abdullah:12345ab@abdullah.igvz11s.mongodb.net/?retryWrites=true&w=majority&appName=abdullah');

mongoose.connection.on('error', error => {
    console.log('connection fail');
});
mongoose.connection.on('connected', () => {
    console.log('connection connected successful');
});

app.use(fileUpload({useTempFiles:true}))
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/user',User)
app.use("/student",Student)
app.use('/img',Img)



app.use((req, res, next) => {
    res.status(401).json({
        meg:"not found"
    })
});
module.exports = app;

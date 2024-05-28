const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb+srv://abdullah:12345ab@abdullah.igvz11s.mongodb.net/?retryWrites=true&w=majority&appName=abdullah');

mongoose.connection.on('error', error => {
    console.log('connection fail');
});
mongoose.connection.on('connected', () => {
    console.log('connection connected successful');
});

app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Student = require('./api/route/students');
const User = require('./api/route/users');
const Img = require('./api/route/img');

app.use('/user', User);
app.use("/student", Student);
app.use('/img', Img);

app.use((req, res, next) => {
    res.status(404).json({
        msg: "not found"
    });
});

module.exports = app;

 const http = require('http')
 const app =require('./app')
 const server =http.createServer(app);
 const serverless = require('serverless-http');

 server.listen(3000,()=>{
    console.log('run in 3000');
 })
 module.exports = serverless(app);

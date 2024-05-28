const http = require('http')
const app =require('./app')
const server =http.createServer(app);
const app = require('./app');

server.listen(3000,()=>{
   console.log('run in 3000');
})



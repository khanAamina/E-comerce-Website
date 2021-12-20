const http = require('http');
const express = require("express");
const bodyParser = require('body-parser');
const homeRoute= require('./routes/home.js');
const aboutRoute =require('./routes/about.js')
const path = require('path');
 

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(homeRoute);
app.use(aboutRoute);
app.use((req,res,next )=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})


const server= http.createServer(app);

server.listen(3000);
const path =require('path');

const express = require('express');

const router= express.Router();

router.get('/about',(req,res,next)=>{
    console.log('inside midleware 1');
    res.sendFile(path.join(__dirname, '../','views', 'about.html'));
    
})
module.exports= router;
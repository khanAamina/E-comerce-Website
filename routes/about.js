const path =require('path');

const express = require('express');

const router= express.Router();

router.get('/about',(req,res,next)=>{
    res.render('about',{PageTitle:'About:E-Commerce'})
    
})
router.get('/contact',(req,res,next)=>{
    res.render('contact',{PageTitle:'Contact: E-Commerce'})
    
})
router.post('/contact',(req,res,next)=>{
    res.send('message send Sucessfully')
    // res.render('contact',{PageTitle:'Contact: E-Commerce'})
    
})
module.exports= router;
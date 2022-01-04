const path =require('path');

const express = require('express');

const authMiddleware = require('../middleware/authMiddleware.js');


const router= express.Router();


router.get('/',(req,res,next)=>{
    
    res.render('home',{PageTitle:'E-Commerce'})
    
})
router.get('/homepage',authMiddleware ,(req,res,next)=>{
    console.log('User:', req.user)
    const user =  req.user.Name ;
    console.log(user)
    res.render('dashboard',{PageTitle:'E-Commerce:Homepage' , Name : user})
    
})
router.get('/products',(req,res,next)=>{
     res.render('product',{PageTitle:'E-Commerce-Products'})
    
})
router.get('/services',(req,res,next)=>{
    res.render('servieces',{PageTitle:'E-Commerce-Products'})
    
})


module.exports= router;
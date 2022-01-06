const path =require('path');

const express = require('express');
const getproductController = require('../modules/controller/productservices.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const flasherMiddleware= require('../middleware/flasherMiddleware.js')



const router= express.Router();


router.get('/',flasherMiddleware, (req,res,next)=>{
    console.log(req.method)
    res.render('home',{PageTitle:'E-Commerce'})
    
})
// router.get('/homepage',authMiddleware ,(req,res,next)=>{
//     console.log(user)
//     res.render('dashboard',{PageTitle:'E-Commerce:Homepage'})
    
// })
router.get('/homepage', authMiddleware ,getproductController.getProduct_dashboard );
// router.get('/products',(req,res,next)=>{
     
// })
// // router.post('/products',(req,res,next)=>{
// //     console.log(addProduct)
// //     res.render('product',{PageTitle:'E-Commerce-Products'})
   
// // })
router.get('/products', getproductController.getProducts);
router.post('/products', getproductController.postProducts);

router.get('/services',(req,res,next)=>{
    res.render('servieces',{PageTitle:'E-Commerce-Products'})
    
})


module.exports= router;
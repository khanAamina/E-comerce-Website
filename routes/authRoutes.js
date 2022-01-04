const path =require('path');

const express = require('express');
const {addUser} = require('../modules/controller/service.js');
const {registerSchema}= require('../modules/validation/registraionVladiation.js');
const {joiErrorFormatter,mongooseErrorFormater} =require('../utils/validationFormat.js')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware.js');
const flasherMiddleware = require('../middleware/flasherMiddleware')

const router= express.Router();
// registration routes via get methode
router.get('/register', guestMiddleware, flasherMiddleware, (req,res,next)=>{
    res.render('register',{PageTitle:'Create your Account:E-Commerce'})    
})

// registration routes via post  methode
router.post('/register', guestMiddleware, async (req,res,next)=>{
    try{
        const validationResult = registerSchema.validate(req.body ,{
            abortEarly: false
        })
        if(validationResult.error){
            req.session.flashData = {
                message: {
                  type: 'error',
                  body: 'Validation Errors'
                },
                errors: joiErrorFormatter(validationResult.error),
                formData: req.body
              }
              return res.redirect('/register')
        }
        
        const user=  await addUser(req.body)
            req.session.flashData = {
                message: {
                type: 'success',
                body: 'Registration success'
                }
            }
            return res.redirect('/register')
    }  
    catch(err){
        req.session.flashData = {
            message: {
              type: 'error',
              body: 'Validation Errors'
            },
            errors: mongooseErrorFormater(err),
            formData: req.body
          }
          return res.redirect('/register')
        }
 })

 // Get SignIn routes 
 router.get('/signIn', guestMiddleware, flasherMiddleware, (req,res,next)=>{
    res.render('signIn',{PageTitle:'SignIn:E-Commerce'})    
})

//post SignIn
router.post('/signIn', guestMiddleware, (req,res,next)=>{
passport.authenticate('local', (err, user, info) => {
  if (err) {
    console.error('Err:', err)
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'login failed'
      }
    }
    return res.redirect('/signIn')
  }

  if (!user) {
    req.session.flashData = {
      message: {
        type: 'error',
        body: info.error
      }
    }
    console.log('info',info.error)
    return res.redirect('signIn')
  }

  req.logIn(user, (err) => {
    if (err) {
      console.error('Err:', err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login failed'
        }
      }
    }
    return res.redirect('/homepage')
  })
})(req, res, next)
})
//  * Logs out a user
router.get('/logout', authMiddleware, (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports= router;
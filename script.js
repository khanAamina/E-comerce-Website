const http = require('http');
require('dotenv').config()
const express = require("express");
const session=require('express-session');
const bodyParser = require('body-parser');
const logger =require('morgan')

const User= require('./modules/models/user.js');
const MongoStore = require('connect-mongo');

const passport = require('passport')
require('./utils/authstartgies/localStartgies.js')


const mongoose =require('mongoose');

const homeRoute= require('./routes/home.js');
const aboutRoute =require('./routes/about.js')
const authRoutes = require('./routes/authRoutes.js')
const config = require('./utils/config.js')
const path = require('path');
 

const app = express();

app.set('view engine', 'ejs')
app.set('views' ,'views')


app.use(session({
      secret: '82393874021a563d8890a6e0b1beea942e42aed5',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:khan321@cluster0.mttqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
    }))
    
app.use(logger('dev'))   
app.use(passport.initialize());
app.use(passport.session());
app.locals.message = {}
app.locals.FormData = {}
app.locals.errors = {}

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use(homeRoute);
app.use(aboutRoute);
app.use(authRoutes);

app.use((req,res,next )=>{
    res.status(404).render('404',{PageTitle :'Page Not Found'});
})


const server= http.createServer(app);


 mongoose.connect(config.mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 .then(result =>{
     console.log('connected to mongoDb database');
     server.listen(config.port, () => {
        console.log(`Server running at port ${config.port}`)
     });
 })
 .catch(err=>{     
     console.log(err);
 });
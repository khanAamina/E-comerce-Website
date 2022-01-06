const { number, string, required } = require('joi');
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Product_Name:{
        type:String, 
        required: true,      
        minlength:[2, ' Product-name is not smaller than 2 words '],
        maxlength :[64 ,' Product-Name  is not more than 64 words ']
    },
    price:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    description:{
        type:String,
        required :[true ],
        minlength:[2],
        maxlength :[120]
    },
    isActive:{
        type: Boolean,
        default:true
    },
    isDeleted:{
        type: Boolean,
        default:false
    }   
},{
    timestamps: true
});

const  Products = mongoose.model('products' , productSchema);
module.exports = Products
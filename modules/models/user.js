const mongoose =require('mongoose');
const { required } = require('nodemon/lib/config');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name:{
            type:String,
            required :[true , ' Name is Required'],
            minlength:[2, ' Name  is not smaller than 2 words '],
            maxlength :[64 ,' Name is not more than 64 words ']
        },
    Mobile_No:{
        country_code:{
            type: Number,
            required:[true, 'country code is required']
        },
        type: Number,
        required :[true , 'Phone Number is Required'],
        minlength:[10, 'Phone number is must be 10 digit'],
        maxlength :[10 ,'Phone number is must be 10 digit']
    },
    email:{
        type:String,
        lowercase: true,
        required :[true , 'email is required'],
        maxlength :[128 ,'email is not more than 128 haractecrs '],
        index:true
    },
    password:{
        type: String,
        required:[true ,' Passward is required']
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

/**
 * Validates unique email
 */
 userSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.users.countDocuments({ email })
    return !emailCount
  },'Email already exists')


// passward is encrypted
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.password)
    return result
}
  

const User = mongoose.model('users' ,userSchema);
module.exports =User

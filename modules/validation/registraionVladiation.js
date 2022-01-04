const Joi =require('joi');
const { required } = require('nodemon/lib/config');

const registerSchema = Joi.object({
    Name: Joi.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
    country_code: Joi.number()
        .required(),
    Mobile_No: Joi.number()
        .integer()
        .min(10)
        .required(),    
    password: Joi.string()
        .required(),
    repeat_password: Joi.ref('password'),
    email: Joi.string()
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

    .with('password', 'repeat_password');

module.exports = {registerSchema};
const {Schema, model} = require('mongoose')

const authorSchema = new Schema({
    fname:{
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim:true,
    },
    nicname: {
        type: String,
        trim:true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    info: {
        type: String,
    },
    position:{
        type: String,
    },
    photo: {
        type: String,
        unique: true,
    },
    is_expert:{
        type: Boolean,
        required: true, 
    }
},
{versionKey: false})




module.exports = model("Author", authorSchema)
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {type:String,required:true,trim:true},
    email: {type:String,required:true,lowercase:true,trim:true,unique:true},
    phone: {type:String,unique:true,trim:true}, 
    userName: {type:String,required:true,trim:true,unique:true},
    gender:{type: String,trim: true,enum: ["Male","Female","others"]},
    password: {type:String,required:true},
    dateOfBirth:{type:String,required:true},
    specialization:{type:String,required:true},
    pincode:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}

}, { timestamps: true });

module.exports = mongoose.model('UserCollection', userSchema)
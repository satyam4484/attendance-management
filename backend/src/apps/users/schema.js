const mongoose = require("../../DB/connection")

const user = new mongoose.Schema({
    userType:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    phoneNo:{
        type:String,
        unique:true,
        min:[11,'length must be 11 got {value}'],
        required:true
    }
});

module.exports  = mongoose.model("user",user);
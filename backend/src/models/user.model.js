const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator');
const userMiddleware = require("../middleware/user.middleware");

require("dotenv").config()



const contactSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    dateOfBirth: {
        type: Date,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});


const Contact =  model("Contact", contactSchema);


const userSchema = new Schema({
    userType: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type:String
    },
    is_verified:{
        type:Boolean,
        default:false
    }
});

// save password in hash way middleware
userSchema.pre("save",userMiddleware.hashPasswordAndGenerateUniqueOtp);

// delete user related tables
userSchema.pre("deleteOne",{ query:true,document: false },async function(next) {
    const user =await  User.findOne({_id:this.getQuery()._id});
    await userMiddleware.deleteUserCascade(Contact,user,next);
    
    next();
});

const User=  model("User", userSchema);

module.exports = {
    User,
    Contact
};


// populate
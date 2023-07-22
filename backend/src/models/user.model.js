const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator')

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


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    next();
})

module.exports = {
    User: model("User", userSchema),
    Contact: model("Contact", contactSchema)
};


// populate
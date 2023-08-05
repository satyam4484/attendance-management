const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator');
const {Teacher} = require("../models/department.model");



async function hashPasswordAndGenerateUniqueOtp(next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        this.otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        next();
    } catch (error) {
        next(error);
    }
};

async function deleteUserCascade(Contact,user,next) {
    try {
        if (user.contact) {
            await Contact.deleteOne({_id:user.contact });
        }
        // delete if the current user is teacher than delete the teacher field also
        if(user.userType === 2) {
            await Teacher.deleteOne({user:user._id});
        }
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = {
    hashPasswordAndGenerateUniqueOtp,
    deleteUserCascade
}
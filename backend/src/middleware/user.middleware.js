const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator');



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

async function deleteUserCascade(Contact,contact_id,next) {
    try {
        if (contact_id) {
            await Contact.deleteOne({_id:contact_id });

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
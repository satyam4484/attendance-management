const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator');
const { Teacher } = require("../models/department.model");
const { Student } = require("../models/Student.model");

/**
 * Assigns roles to users based on their userType.
 * Creates teacher or student records accordingly.
 * @param {Function} next - The next middleware function.
 */

async function userRoles(next) {
    try {
        if (this.userType === 2) {
            const newTeacher = await Teacher.create({
                user: this._id
            });
            await newTeacher.save();
        } else if (this.userType === 3) {
            const newStudent = await Student.create({
                user: this._id
            });
            await newStudent.save();
        }
        // next();
    } catch (error) {
        next(error);
    }
}

/**
 * Hashes the user's password and generates a unique OTP before saving.
 * @param {Function} next - The next middleware function.
 */
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


/**
 * Handles cascading deletion of related data when a user account is deleted.
 * @param {Model} Contact - The Contact model.
 * @param {Object} user - The user object being deleted.
 * @param {Function} next - The next middleware function.
 */
async function deleteUserCascade(Contact, user, next) {
    try {
        if (user.contact) {
            await Contact.deleteOne({ _id: user.contact });
        }
        // delete if the current user is teacher than delete the teacher field also
        if (user.userType === 2) {
            await Teacher.deleteOne({ user: user._id });
        } else if (user.userType === 3) {
            // delete the related student record
            await Student.deleteOne({ user: user._id });
        }
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = {
    hashPasswordAndGenerateUniqueOtp,
    deleteUserCascade,
    userRoles
}
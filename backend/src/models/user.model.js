const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const otpGenerator = require('otp-generator');
const userMiddleware = require("../middleware/user.middleware");

require("dotenv").config()


const contactSchema = new Schema({
    /**
     * Phone number of the contact.
     * @type {string}
     * @required
     * @unique
     * @trim
     */
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    /**
     * Gender of the contact.
     * @type {string}
     * @enum {['Male', 'Female', 'Other']}
     */
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    /**
     * Date of birth of the contact.
     * @type {Date}
     */
    dateOfBirth: {
        type: Date,
    },
    /**
     * State of the contact's address.
     * @type {string}
     * @required
     */
    state: {
        type: String,
        required: true,
    },
    /**
     * City of the contact's address.
     * @type {string}
     * @required
     */
    city: {
        type: String,
        required: true,
    },
    /**
     * Pincode of the contact's address.
     * @type {string}
     * @required
     */
    pincode: {
        type: String,
        required: true,
    },
    /**
     * Detailed address of the contact.
     * @type {string}
     * @required
     */
    address: {
        type: String,
        required: true,
    },
});

const Contact = model("Contact", contactSchema);


const userSchema = new Schema({
    /**
     * User type.
     * @type {number}
     * @required
     */
    userType: {
        type: Number,
        required: true,
    },
    /**
     * User's name.
     * @type {string}
     * @required
     */
    name: {
        type: String,
        required: true,
    },
    /**
     * User's email address.
     * @type {string}
     * @unique
     * @required
     */
    email: {
        type: String,
        unique: true,
        required: true,
    },
    /**
     * Reference to the contact information for the user.
     * @type {Schema.Types.ObjectId}
     * @ref {Contact}
     * @required
     */
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
    /**
     * User's password.
     * @type {string}
     * @required
     */
    password: {
        type: String,
        required: true
    },
    /**
     * One-time password for user verification.
     * @type {string}
     */
    otp: {
        type: String
    },
    /**
     * Indicates if the user is verified.
     * @type {boolean}
     * @default false
     */
    is_verified: {
        type: Boolean,
        default: false
    }
});

// save password in hash way middleware
userSchema.pre("save", userMiddleware.hashPasswordAndGenerateUniqueOtp);

// create user related profiles
userSchema.post("save", userMiddleware.userRoles);

// delete user related tables
userSchema.pre("deleteOne", { query: true, document: false }, async function (next) {
    const user = await User.findOne({ _id: this.getQuery()._id });
    await userMiddleware.deleteUserCascade(Contact, user, next);

    next();
});

const User = model("User", userSchema);

module.exports = {
    User,
    Contact
};


// populate
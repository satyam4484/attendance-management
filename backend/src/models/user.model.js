const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config()

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
        unique: [true, "Email already exists"],
        required: true,
    },
    contact: {
        type: String,
        unique: [true, "Contact already exists"],
        min: [10, 'length must be 10 got {value}'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

module.exports = model("user", userSchema);

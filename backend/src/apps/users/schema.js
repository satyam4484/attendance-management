const mongoose = require("../../DB/connection")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
        type: String,
        unique: true,
        min: [10, 'length must be 10 got {value}'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this.id},'mynameissatyamsinghadeveloper');
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error) {
        console.log(error)
    }
}
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

module.exports = mongoose.model("user", userSchema);
const User = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const generateAuthToken = (id)=> {
    return jwt.sign({ _id: id }, process.env.SECRET_KEY);
}


const Response = (error, message = "", data = []) => {
    return { error, message, data };
}


const getUser = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.user_id }, { password: 0 });
        res.send(Response(false, "user found", user))
    }catch(error){
        res.send(Response(true, "Invalid User Please login again"))
    }
}

const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.find({ email: data.email });
        if (user) {
            const value = await bcrypt.compare(data.password, user[0].password)
            if (value) {
                res.send(Response(false, "", {
                    token: generateAuthToken(user[0]._id)
                }))
            } else {
                throw "Enter a valid Password";
            }
        } else {
            throw "Enter a valid Email";
        }

    } catch (error) {
        res.send(Response(true, error));
    }
}

const createUser = async (req, res) => {
    try {
        const data = req.body;
        if (data.password === data.confirmPassword) {
            const user = await new User(req.body);
            // const token = await user.generateAuthToken();
            const response = await user.save();
            res.status(201).send(Response(false, "Account created Sucessfully"));
        }else{
            throw "Password Didn't match";

        }
    } catch (error) {
        res.send(Response(true, error));
    }
}


module.exports = { getUser, createUser, loginUser,Response }
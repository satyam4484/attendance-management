const jwt = require("jsonwebtoken");
const {Response} = require("../services/services");

const {User} = require("../models/user.model");

async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(" ")[1];
            const tokenVerify = await jwt.verify(token, process.env.SECRET_KEY);
            if (tokenVerify) {
                const user = await User.findOne(
                    { _id: tokenVerify._id },
                    { password: 0, otp: 0 }
                  );
                req.user = user;

            }
            next();
        } else {
            res.send({ result: "Token is invalid" })
        }
    } catch (error) {
        res.send(Response(true,"Invalid User"))
    }
}

module.exports = verifyToken;
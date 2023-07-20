const jwt = require("jsonwebtoken");
const {Response} = require("../Controllers/user.controller")

async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(" ")[1];
            const tokenVerify = await jwt.verify(token, process.env.SECRET_KEY);
            if (tokenVerify) {
                req.user_id = tokenVerify._id;
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
const User = require("./schema")

const get = async (req,res) => {
    console.log("find");
    res.send({"hel":"js"})
}

module.exports = {get}
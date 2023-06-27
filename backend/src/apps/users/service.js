const User = require("./schema");

const get = async (req,res) => {
    console.log("find");
    res.send({"hel":"js"})
}

const createUser = async (req,res) => {
    try{
        const data = await new User(req.body);
        const token = await data.generateAuthToken();
        console.log(token);
        const response = await data.save();
        console.log(response);
        res.send({error:false});
       
    }catch(error){
        console.log(error);
        res.send({error});
    }
}
// adding a module exports 
// changing the things more
                        
module.exports = {get,createUser}
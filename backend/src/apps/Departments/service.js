const Department = require("./schema");
const { Response } = require("../users/service");


const addDepartment = async (req, res) => {
    try {
        const user = req.user_id;
        const dp =await  new Department({
            name:req.body.name,
            organization:user
        }).save();
        res.send(Response(false,"",dp));
    } catch (error) {
        console.log("error in getting department");
        res.send(Response(true, "Department Already Exists"));
    }
}

module.exports = {addDepartment};
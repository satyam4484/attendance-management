const {Department} = require("../models/department.model");
const {Response}  = require("../services/services");

const createDepartment = async (req,res) => {
    try{
        if(req.user.userType == 1) {
            const data = req.body;
            const newDepartment = await Department.create({
                organization:req.user._id,
                ...data
            });
            await newDepartment.save();
            res.send(Response(false,"",newDepartment));
        }else{
            throw "Access denied"
        }

    }catch(error) {
        res.send(Response(true,error));
    }
}


module.exports = {
    createDepartment
}


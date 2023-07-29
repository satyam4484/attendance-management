const {Department} = require("../models/department.model");
const {Response}  = require("../services/services");

const createDepartment = async (req,res) => {
    try{
        

    }catch(error) {
        res.send(Response(true,error));
    }
}
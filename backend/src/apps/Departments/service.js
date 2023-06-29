const {Department,Sem} = require("./schema");
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


const addSem = async (req,res) => {
    try{
        const sem = await new Sem(req.body).save();
        res.send(Response(false,"Semester Added",sem));        
    }catch(error) {
        console.log("error in adding semester");
        res.send(Response(true,error.message))
    }
}

module.exports = {addDepartment,addSem};
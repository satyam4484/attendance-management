const {Organization} = require("../models/organization.model");
const {Response}  = require("./user.controller");


// Create a POST endpoint to insert a new organization

const createOrganization = async (req,res) => {
    try{
        const data = req.body;
        console.log("user ",req.user_id);
        
        const newOrganization = new Organization({...data,user:req.user_id});
        const savedOrganization = await newOrganization.save();

        res.send(Response(false,"",savedOrganization));
    }catch(error) {
        res.send(Response(true,error));
    }
};

const updateOrganization = async (req,res) => {
    try{
        const updatedOrg = await Organization.findOneAndUpdate(
            {user:req.user_id},
            {$set:req.body},
            {new:true}
        );
        if(updatedOrg) {
            res.send(Response(false,"",updatedOrg));
        }else{
            throw "Failed to update organization";
        }
    }catch(error) {
        res.send(Response(true,"Failed to update organization"));
    }
}
module.exports = {
    createOrganization,
    updateOrganization
}
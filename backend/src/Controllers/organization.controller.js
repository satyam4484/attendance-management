const { Organization } = require("../models/organization.model");
const { Response } = require("../services/services");


// Create a POST endpoint to insert a new organization

module.exports.createOrganization = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            const data = req.body;
            const newOrganization = new Organization({ ...data, user: req.user._id });
            const savedOrganization = await newOrganization.save();

            res.send(Response(false, "", savedOrganization));
        }else{
            throw "You don't have access to organization";
        }

    } catch (error) {
        res.send(Response(true, error));
    }
};

module.exports.updateOrganization = async (req, res) => {
    try {
        const updatedOrg = await Organization.findOneAndUpdate(
            { user: req.user._id },
            { $set: req.body },
            { new: true }
        );
        if (updatedOrg) {
            res.send(Response(false, "", updatedOrg));
        } else {
            throw "Failed to update organization";
        }
    } catch (error) {
        res.send(Response(true, "Failed to update organization"));
    }
}

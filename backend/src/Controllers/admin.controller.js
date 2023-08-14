const { Response } = require("../services/services");
const { Organization } = require("../models/organization.model");


module.exports.getOrganizationList = async (req, res) => {
    try {
        if (req.user.userType === 0) {
            const data = await Organization.find().populate({
                path: 'user',
                select: 'name _id'
            });
            res.send(Response(false, data));
        } else {
            throw "You Don't have access";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

module.exports.verifyOrganization = async (req, res) => {
    try {
        if (req.user.userType === 0) {
            const org = req.body.organization_id;
            const organization = await Organization.findOneAndUpdate({ _id: org }, { $set: { is_verified: true } }, { new: true }).populate({
                path: 'user',
                select: 'name _id'
            });
            if (organization) {
                res.send(Response(false, "Organization mark as verified", organization));
            } else {
                throw "Something went wrong try again";
            }
        }else{
            throw "You Don't have access";
        }

    } catch (error) {
        res.send(Response(true, error));
    }
}


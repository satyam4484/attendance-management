const { Organization } = require("../models/organization.model");
const { Department, Teacher } = require("../models/department.model");
const { Response } = require("../services/services");


module.exports.getTeachers = async (req, res) => {
    try {
        // Check if the user type is 1 and the organization is verified
        if (req.user.userType === 1 && req.organization.is_verified) {
            const department = await Department.findOne({ ...req.body });
            const teachers = await Teacher.find({ department: department._id },{department:0}).populate([
                {
                    path: 'user',
                    select: 'name _id'
                },
            ]
            ) // Find teachers belonging to the found department
            res.send(Response(false, "", teachers)); // Respond with the list of teachers
        } else {
            throw "Access Denied"; // If user type is not 1 or organization is not verified, throw an error
        }
    } catch (error) {
        console.log(error);
        res.send(Response(true, error));
    }
}

// Create a new organization
module.exports.createOrganization = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            const data = req.body;
            const newOrganization = new Organization({ ...data, user: req.user._id });
            const savedOrganization = await newOrganization.save();

            res.send(Response(false, "Organization created", savedOrganization));
        } else {
            throw "You don't have access to organization";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

// Update organization details
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
};

// Verify teacher accounts
module.exports.verifyTeacher = async (req, res) => {
    try {
        if (req.user.userType === 1 || req.user.userType === 2) {
            const data = req.body.teachers;
            for (val in data) {
                const teacher = await Teacher.findOneAndUpdate(
                    { _id: data[val].id },
                    { $set: { verified: true } },
                    { new: true }
                );
                if (!teacher) {
                    throw "Teacher with the current id does not exist";
                }
            }
            res.send(Response(false, "Teachers account verified"));
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

// Get departments of the organization
module.exports.getDepartments = async (req, res) => {
    try {
        if (req.user.userType === 1) {
            const org = await Organization.findOne({ user: req.user._id });
            // Retrieve departments of the organization
            const departments = await Department.find({ organization: org._id }, { name: true });
            res.send(Response(false, "", departments));
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

// Assign a teacher to a department
module.exports.assignDepartment = async (req, res) => {
    try {
        if (req.user.userType === 1) {
            const data = req.body;
            const teacher = await Teacher.findOneAndUpdate(
                { _id: data.teacher_id },
                { $set: { department: data.department_id } },
                { new: true }
            );
            if (teacher) {
                res.send(Response(false, "Added to department"));
            } else {
                throw "Invalid Teacher Profile";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

const { Department, Teacher } = require("../models/department.model");
const { Response } = require("../services/services");

module.exports.createDepartment = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            const data = req.body;
            const newDepartment = await Department.create({
                ...data
            });
            await newDepartment.save();
            res.send(Response(false, "", newDepartment));
        } else {
            throw "Access denied"
        }

    } catch (error) {
        res.send(Response(true, error));
    }
}


module.exports.addTeachers = async (req, res) => {
    try {
        if (req.user.userType != 3) {
            const department = await Department.findOne({ _id: req.body.departmentId });
            if (department) {
                const member = req.body.memberIds.map(member => (member.id));
                department.members.push(...member);
                await department.save();
                res.send(Response(false, "Faculty added successfully"));
            } else {
                throw "Invalid Department";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
}

// function to add a teacher as a hod for a department
module.exports.createHod = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            console.log()
            const teacher = await Teacher.findOneAndUpdate({ _id: req.body._id }, { $set: { is_hod: true } }, { new: true });
            if (teacher) {
                res.send(Response(false,"Hod updated successfully"));
            } else {
                throw "Select a valid teacher";
            }
        } else {
            throw "Access Denied";
        }
    } catch (error) {
        res.send(Response(true, error));
    }
};

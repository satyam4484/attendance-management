const { Department } = require("../models/department.model");
const { Response } = require("../services/services");

module.exports.createDepartment = async (req, res) => {
    try {
        if (req.user.userType == 1) {
            const data = req.body;
            const newDepartment = await Department.create({
                organization: req.user._id,
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
            console.log(req.body)
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

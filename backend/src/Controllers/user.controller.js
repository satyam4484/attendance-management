const bcrypt = require("bcryptjs");
const { User, Contact } = require("../models/user.model");
const { Teacher } = require("../models/department.model");

const { sendMail } = require("../services/mail");
const { Response, generateAuthToken,generateOtp,verifyOtp } = require("../services/services");
const {checkEmailValid,checkPhone} = require("../services/validation");

require("dotenv").config();

module.exports.getUserContact = async (req, res) => {
  try {
    const id = req.user._id;
    const contact = await User.findOne({ _id: id }).populate('contact');
    if (contact) {
      res.send(Response(false, "", contact.contact));
    } else {
      throw "User Contact Details not found";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};


module.exports.editUserContact = async (req, res) => {
  try {
    const data = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: req.user.contact },
      { $set: data },
      { new: true }
    );

    if (contact) {
      res.send(Response(false, "", contact));
    } else {
      throw "User Contact Details not found";
    }
  } catch (error) {
    console.log(error);
    res.send(Response(true, error));
  }
};




module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.user._id },
      { password: 0, otp: 0 }
    ).populate("contact");
    res.send(Response(false, "", user));
  } catch (error) {
    res.send(Response(true, "Invalid User Please login again"));
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (user) {
      const value = await bcrypt.compare(data.password, user.password);
      if (value) {
        res.send(
          Response(false, "", {
            token: generateAuthToken(user._id),
          })
        );
      } else {
        throw "Enter a valid Password";
      }
    } else {
      throw "Enter a valid Email";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

// create
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    if (data.password === data.confirmPassword) {
      const data = req.body;
      const newContact = await Contact.create(data.Contact);
      const user = await new User({
        userType: data.userType,
        name: data.name,
        email: data.email,
        contact: newContact._id,
        password: data.password,
      });

      const response = await user.save();
      // send the mail to user if account is created
      if (response) {

        // create a teacher account
        if (response.userType === 2) {
          const newTeacher = await Teacher.create({
            user: response._id
          });
          await newTeacher.save();
        }

        sendMail(response.name, response.otp);
        res.status(201).send(Response(false, "Account created Sucessfully"));
      } else {
        throw "Something went wrong try again";
      }
    } else {
      throw "Password Didn't match";
    }
  } catch (error) {
    console.log(error);
    res.send(Response(true, error));
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true, select: "-password -contact" }
    );
    console.log(user);
    if (user) {
      res.send(Response(false, "User Profile updated", user));
    } else {
      throw "User not found";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};



// 1-> organization
// 2-> department
// 3-> students

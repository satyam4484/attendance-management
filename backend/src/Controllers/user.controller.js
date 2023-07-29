const bcrypt = require("bcryptjs");
const { User, Contact } = require("../models/user.model");
const { sendMail } = require("../services/mail");
const otpGenerator = require("otp-generator");
const {Response,generateAuthToken}  = require("../services/services");
require("dotenv").config();

// VocalMark


// validations
const checkEmailValid = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      throw "Email Already taken! Please try different one";
    } else {
      res.send(Response(false));
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

const checkPhone = async (req, res) => {
  try {
    const phone = await Contact.findOne({ phoneNumber: req.body.phoneNumber });
    if (phone) {
      throw "phoneNumber already taken! Please try different one";
    } else {
      res.send(Response(false));
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

// contact apis
const getUserContact = async (req, res) => {
  try {
    const id = req.user._id;
    const contact = await User.findOne({_id: id }).populate('contact');
    if (contact) {
      res.send(Response(false, "", contact.contact));
    } else {
      throw "User Contact Details not found";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};


const editUserContact = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.user)
    const contact = await Contact.findOneAndUpdate(
      { _id: req.user.contact },
      { $set: data },
      { new: true }
    );

    if (contact) {
      res.send(Response(false,"",contact));
    } else {
      throw "User Contact Details not found";
    }
  } catch (error) {
    console.log(error);
    res.send(Response(true, error));
  }
};

const generateOtp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { otp: otp } },
        { new: true }
      );
      sendMail(updatedUser.name, updatedUser.otp);
      res.send(
        Response(false, "Otp send to mail", { user_id: updatedUser._id })
      );
    } else {
      throw "Enter a valid email";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

const verifyOtp = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user_id });
    if (user) {
      if (user.otp === req.body.otp) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: { is_verified: true } }
        );
        res.send(Response(false, "Otp verified successfully"));
      } else {
        throw "Invalid Otp! Try again";
      }
    } else {
      throw "Invalid Email ! Try again";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

const getUser = async (req, res) => {
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

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.find({ email: data.email });
    if (user) {
      const value = await bcrypt.compare(data.password, user[0].password);
      if (value) {
        res.send(
          Response(false, "", {
            token: generateAuthToken(user[0]._id),
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
const createUser = async (req, res) => {
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
        sendMail(response.name, response.otp);
      }
      res.status(201).send(Response(false, "Account created Sucessfully"));
    } else {
      throw "Password Didn't match";
    }
  } catch (error) {
    res.send(Response(true, error));
  }
};

const updateUser = async (req, res) => {
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

module.exports = {
  getUser,
  createUser,
  loginUser,
  Response,
  checkEmailValid,
  checkPhone,
  updateUser,
  verifyOtp,
  generateOtp,
  getUserContact,
  editUserContact
};

// 1-> organization
// 2-> department
// 3-> students

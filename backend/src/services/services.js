const {User} = require('../models/user.model');
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

require("dotenv").config()



module.exports.generateOtp = async (req, res) => {
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


module.exports.verifyOtp = async (req, res) => {
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



module.exports.generateAuthToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY);
};


module.exports.Response = (error, message = "", data = []) => {
  return { error, message, data };
};


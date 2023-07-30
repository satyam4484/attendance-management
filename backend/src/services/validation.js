const {User,Contact} = require('../models/user.model');
const {Response} = require('./services');





module.exports.checkEmailValid = async (req, res) => {
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
  
module.exports.checkPhone = async (req, res) => {
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
const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateAuthToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY);
};


const Response = (error, message = "", data = []) => {
  return { error, message, data };
};

module.exports = {
  generateAuthToken,
  Response

}
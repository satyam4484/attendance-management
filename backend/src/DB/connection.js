const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DATABASE)
    .then((res) => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

module.exports = mongoose;
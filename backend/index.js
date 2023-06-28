const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require("dotenv").config()
require("./src/DB/connection")
require("./src/schema");



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())

const userRouter = require('./src/apps/users/route');
// console.log(require('crypto').randomBytes(256).toString('base64'))
app.use('/api/user',userRouter);

app.listen(8000,()=>{
    console.log("listening to port 8000")
})

module.exports = app;
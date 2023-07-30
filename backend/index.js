const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require("dotenv").config()
require("./src/DB/connection")
const cors = require('cors');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())

const userRouter = require("./src/Routes/user.routes");
const organizationRouter = require('./src/Routes/organization.routes');

app.use('/api/user',userRouter);
app.use('/api/organization',organizationRouter);
app.use(cors({
    origin: '*'
}));

app.listen(8000,()=>{
    console.log("listening to port 8000")
})

module.exports = app;
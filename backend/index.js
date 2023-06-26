const express = require("express");
const app = express();
require("dotenv").config()



app.listen(8000,()=>{
    console.log("listening to port 8000")
})
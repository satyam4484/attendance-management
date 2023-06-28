const mongoose = require("../../DB/connection")

const departmentSchema = new mongoose.Schema({
    organization:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    }
})


module.exports = mongoose.model("department",departmentSchema);
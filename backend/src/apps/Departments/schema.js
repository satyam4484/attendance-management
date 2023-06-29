const mongoose = require("../../DB/connection")

const departmentSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const semesterShema = new mongoose.Schema({
    sem_name: {
        type: String,
        unique: true,
        required: true
    }
});


const batchShema = new mongoose.Schema({
    sem:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
});



module.exports = { Department: mongoose.model("department", departmentSchema), 
                   Sem: mongoose.model("semester", semesterShema) ,
                   Batch : mongoose.model("batch",batchShema)
                };
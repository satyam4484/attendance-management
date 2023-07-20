const {model,Schema} = require("mongoose");



const departmentSchema = new Schema({
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

const semesterShema = new Schema({
    sem_name: {
        type: String,
        unique: true,
        required: true
    }
});


const batchShema = new Schema({
    sem:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
});



module.exports = { Department: model("department", departmentSchema), 
                   Sem:model("semester", semesterShema) ,
                   Batch : model("batch",batchShema)
                };
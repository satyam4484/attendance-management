const { model, Schema } = require("mongoose");

const attendanceSchema = new Schema({
    subject:{
        type:Schema.Types.ObjectId,
        ref:'Subject',
        required:true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',

        
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default:Date.now
    },
    present: {
        type: Boolean,
        default: false,
    },
});


const Attendance = model('Attendance',attendanceSchema);


module.exports = {Attendance};



const { model, Schema } = require("mongoose");

const departmentSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  head: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});


const TeacherSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    is_hod:{
      type:Boolean,
      default:false
    },
    verified:{
      type:Boolean,
      default:false
    },
    department:{
      type:Schema.Types.ObjectId,
      ref:'Department',
      default:undefined
    },
    subjects:[{
      type:Schema.Types.ObjectId,
      ref:'Subject'
    }]
});

const subjectSchema = new Schema({
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
});

const batchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const Batch = model("Batch", batchSchema);
const Department = model("Department", departmentSchema);
const Subject = model("Subject", subjectSchema);
const Teacher = model("Teacher",TeacherSchema);

module.exports = { Department, Subject,Batch,Teacher };

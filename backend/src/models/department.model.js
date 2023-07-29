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
    ref: "User",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});


const Teacher = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    subjects:[subjectSchema]
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

const Batch = mongoose.model("Batch", batchSchema);
const Department = model("Department", departmentSchema);
const Subject = model("Subject", subjectSchema);

module.exports = { Department, Subject,Batch,Teacher };

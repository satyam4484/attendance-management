const {model,Schema} = require("mongoose");

const studentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rollNumber: {
      type: Number,
      unique: true,
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
    batch: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
    },
});

const Student = model('Student',studentSchema);


module.exports = {Student}
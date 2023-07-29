const {model,Schema} = require("mongoose");

const studentSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
});

const Student = model('Student',studentSchema);


module.exports = {Student}
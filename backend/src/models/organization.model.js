const { model, Schema } = require("mongoose");
const organizationMiddleware = require("../middleware/organization.middleware");


const organizationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  is_verified:{
    type:Boolean,
    default:false
  }
});


organizationSchema.pre("deleteOne",{ query:true,document: false },async function (next) {
  const organization = await Organization.findOne({_id:this.getQuery()._id});
  await organizationMiddleware.deleteOrganizationCascades(organization,next);
  next();
});



const Organization =  model("organization", organizationSchema);

module.exports = {
  Organization,
};

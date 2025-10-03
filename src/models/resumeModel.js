const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" ,
      required:true
    },
    resume_name: {
      type: String,
      required:true
    },
    job_desc: {
      type:String,
      required:true
    },
    score: {
      type:String
    },
    feedback: {
      type:String
    },
    shortlisted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);

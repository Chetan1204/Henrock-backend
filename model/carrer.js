const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  jobRole: String,
  message: String,
  cv: String, // filename or path
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);

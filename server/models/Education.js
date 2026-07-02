const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
  },
  degree: {
    type: String,
    required: [true, 'Degree name is required'],
    trim: true,
  },
  CGPA: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    required: [true, 'Year or duration is required'],
  }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);

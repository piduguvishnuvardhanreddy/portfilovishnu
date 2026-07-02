const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);

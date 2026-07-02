const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  image: {
    type: String,
    default: '',
  },
  technologies: {
    type: [String],
    required: [true, 'Technologies are required'],
  },
  githubLink: {
    type: String,
    default: '',
  },
  liveLink: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

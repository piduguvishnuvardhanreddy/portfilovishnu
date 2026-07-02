const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: {
      values: ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Tools', 'Deployment'],
      message: '{VALUE} is not a valid skill category',
    }
  },
  level: {
    type: Number,
    required: [true, 'Skill level percentage is required'],
    min: [0, 'Skill level cannot be less than 0'],
    max: [100, 'Skill level cannot exceed 100'],
  },
  icon: {
    type: String,
    default: 'Code',
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);

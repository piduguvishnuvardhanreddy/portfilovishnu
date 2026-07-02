const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new experience
// @route   POST /api/experiences
// @access  Private/Admin
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Education = require('../models/Education');

// @desc    Get all education
// @route   GET /api/educations
// @access  Public
exports.getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ year: -1 });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new education
// @route   POST /api/educations
// @access  Private/Admin
exports.createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update education
// @route   PUT /api/educations/:id
// @access  Private/Admin
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete education
// @route   DELETE /api/educations/:id
// @access  Private/Admin
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.status(200).json({ success: true, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

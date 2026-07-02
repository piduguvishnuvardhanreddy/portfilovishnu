const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Mongoose schema validation will catch validation errors
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject: subject || 'No Subject',
      message
    });
    
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

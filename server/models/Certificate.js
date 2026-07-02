const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true,
  },
  issuer: {
    type: String,
    required: [true, 'Issuer name is required'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Issue date is required'],
  },
  image: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);

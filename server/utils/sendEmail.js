const nodemailer = require('nodemailer');

/**
 * Send an email notification using Nodemailer
 * @param {Object} options - Options containing subject, html content
 */
const sendEmail = async (options) => {
  // Check if email credentials are set and are not placeholder values
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    (process.env.EMAIL_USER === 'vr982802@gmail.com' && process.env.EMAIL_PASS === 'YOUR_16_DIGIT_GOOGLE_APP_PASSWORD')
  ) {
    console.warn('Email notification skipped: EMAIL_USER or EMAIL_PASS environment variables are not configured with active credentials.');
    return { success: false, skipped: true };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER || 'vr982802@gmail.com',
    subject: options.subject || 'New Portfolio Contact Form Submission',
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
};

module.exports = sendEmail;

const { Resend } = require('resend');

/**
 * Send an email notification using Resend API (HTTP-based)
 * @param {Object} options - Options containing subject, html content
 */
const sendEmail = async (options) => {
  // Check if Resend API Key is set and not a placeholder
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === 'YOUR_RESEND_API_KEY'
  ) {
    console.warn('Email notification skipped: RESEND_API_KEY environment variable is not configured with active credentials.');
    return { success: false, skipped: true };
  }

  // Initialize Resend with API Key
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Note: On free/unverified Resend tier, the 'from' email MUST be 'onboarding@resend.dev'
  // and the 'to' email must be your registered account email (vr982802@gmail.com).
  const mailOptions = {
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: process.env.EMAIL_RECEIVER || 'vr982802@gmail.com',
    subject: options.subject || 'New Portfolio Contact Form Submission',
    html: options.html,
  };

  const { data, error } = await resend.emails.send(mailOptions);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, messageId: data.id };
};

module.exports = sendEmail;

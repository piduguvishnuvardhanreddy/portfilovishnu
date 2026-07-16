const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

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

    // Create custom designed email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333333;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #eef2f5;
          }
          .header {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            padding: 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 40px 30px;
          }
          .field-card {
            background-color: #f8fafc;
            border-left: 4px solid #6366f1;
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 0 8px 8px 0;
          }
          .field-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 4px;
            letter-spacing: 0.5px;
          }
          .field-value {
            font-size: 16px;
            color: #1e293b;
            line-height: 1.5;
          }
          .message-box {
            background-color: #f8fafc;
            border: 1px dashed #cbd5e1;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message</h1>
          </div>
          <div class="content">
            <div class="field-card">
              <div class="field-label">From</div>
              <div class="field-value"><strong>${name}</strong> (${email})</div>
            </div>
            
            ${phone ? `
            <div class="field-card">
              <div class="field-label">Phone</div>
              <div class="field-value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="field-card">
              <div class="field-label">Subject</div>
              <div class="field-value">${subject || 'No Subject'}</div>
            </div>
            
            <div class="field-label" style="margin-top: 25px;">Message</div>
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            <p>This message was sent from your portfolio website's contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Attempt to send email but do not block client response if it fails
    try {
      await sendEmail({
        subject: `New Portfolio Message: ${subject || 'No Subject'}`,
        html: emailHtml
      });
      console.log(`Email notification successfully sent for contact message ID: ${contact._id}`);
    } catch (emailErr) {
      console.error(`Email notification failed for contact message ID: ${contact._id}:`, emailErr.message);
    }
    
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

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the parent server directory .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const sendEmail = require('../utils/sendEmail');

async function runTest() {
  console.log('--- Email Configuration Test ---');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******** (Provided)' : '(Not Provided)');
  console.log('EMAIL_RECEIVER:', process.env.EMAIL_RECEIVER);
  console.log('--------------------------------');

  if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'YOUR_16_DIGIT_GOOGLE_APP_PASSWORD') {
    console.log('Result: SKIPPED. Please replace YOUR_16_DIGIT_GOOGLE_APP_PASSWORD in your .env file with your real 16-digit App Password, then run this test.');
    return;
  }

  try {
    console.log('Sending test email...');
    const result = await sendEmail({
      subject: 'Portfolio Contact Form Test Email',
      html: `
        <h1>Test Email Successful!</h1>
        <p>This email verifies that your portfolio's contact form email configuration is fully functional.</p>
        <p><strong>Configured Sender:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Configured Receiver:</strong> ${process.env.EMAIL_RECEIVER}</p>
      `
    });
    console.log('Result: SUCCESS');
    console.log('Message Info:', result);
  } catch (error) {
    console.error('Result: FAILED');
    console.error('Error Details:', error);
  }
}

runTest();

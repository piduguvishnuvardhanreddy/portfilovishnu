const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the parent server directory .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const sendEmail = require('../utils/sendEmail');

async function runTest() {
  console.log('--- Resend API Email Configuration Test ---');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '******** (Provided)' : '(Not Provided)');
  console.log('EMAIL_RECEIVER:', process.env.EMAIL_RECEIVER);
  console.log('-------------------------------------------');

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'YOUR_RESEND_API_KEY') {
    console.log('Result: SKIPPED. Please replace YOUR_RESEND_API_KEY in your .env file with your real Resend API Key, then run this test.');
    return;
  }

  try {
    console.log('Sending test email via Resend...');
    const result = await sendEmail({
      subject: 'Resend API Integration Test Email',
      html: `
        <h1>Resend Email Integration Successful!</h1>
        <p>This email verifies that your portfolio's contact form email configuration is fully functional using Resend.</p>
        <p><strong>Configured Receiver:</strong> ${process.env.EMAIL_RECEIVER}</p>
      `
    });
    console.log('Result: SUCCESS');
    console.log('Message Info:', result);
  } catch (error) {
    console.error('Result: FAILED');
    console.error('Error Details:', error.message || error);
  }
}

runTest();

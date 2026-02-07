import { Router } from 'express';
import { createTransport } from 'nodemailer';

const router = Router();

// Setup email transporter (using Gmail)
const createTransporter = () => {
  const user = process.env.GMAIL_USER;
  let pass = process.env.GMAIL_APP_PASSWORD;

  // Remove spaces from password (Gmail app passwords have spaces for readability)
  if (pass) {
    pass = pass.replace(/\s/g, '');
  }

  console.log('🔍 Debug - Gmail User:', user);
  console.log('🔍 Debug - App Password length:', pass?.length);
  console.log('🔍 Debug - App Password (masked):', pass ? pass.substring(0, 4) + '****' : 'NOT SET');

  if (!user || !pass) {
    console.warn('⚠️ Email credentials not configured in .env');
    return null;
  }

  return createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });
};

// POST /api/send-alert - Send demo alert email
router.post('/send-alert', async (req, res) => {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      return res.status(500).json({
        success: false,
        error: 'Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env',
      });
    }

    const { recipientEmail, recipientName, message } = req.body;
    
    console.log('📬 Request body:', { recipientEmail, recipientName, message });

    // For demo, send to yourself
    const targetEmail = recipientEmail || process.env.GMAIL_USER;
    
    console.log('📧 Target email:', targetEmail);
    console.log('📧 GMAIL_USER from env:', process.env.GMAIL_USER);

    if (!targetEmail) {
      return res.status(400).json({
        success: false,
        error: 'No recipient email provided and GMAIL_USER not configured',
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: targetEmail,
      subject: `🧺 RHaundry Alert: Clothes Ready for Collection`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #006400; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🧺 RHaundry Alert</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Hall Laundry Management System</p>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #006400; margin-top: 0;">Hi ${recipientName || 'Resident'}! 👋</h2>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              ${message || 'Your laundry is ready for collection! Please collect your clothes as soon as possible.'}
            </p>

            <div style="background-color: #f0f9f0; border-left: 4px solid #006400; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #555;"><strong>⏰ Reminder:</strong> Please collect your items within 10 minutes to avoid inconveniencing others.</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:5173" style="background-color: #006400; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View in RHaundry
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

            <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
              This is a demo notification from RHaundry v1.0.4<br>
              NUS Hall Laundry Management System
            </p>
          </div>
        </div>
      `,
    };

    try {
      console.log('📤 Attempting to send email to:', targetEmail);
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);

      res.status(200).json({
        success: true,
        messageId: info.messageId,
        message: 'Alert email sent successfully!',
      });
    } catch (sendError) {
      console.error('❌ Nodemailer Error:', {
        name: sendError instanceof Error ? sendError.name : 'Unknown',
        message: sendError instanceof Error ? sendError.message : String(sendError),
        code: (sendError as any).code,
        response: (sendError as any).response,
      });
      res.status(500).json({
        success: false,
        error: sendError instanceof Error ? sendError.message : 'Failed to send email',
        details: (sendError as any).response || (sendError as any).code,
      });
    }
  } catch (error) {
    console.error('❌ Request Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process request',
    });
  }
});

export default router;

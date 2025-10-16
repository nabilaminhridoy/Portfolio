import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.peculiargadgets.com.bd',
      port: 465,
      secure: true, // SSL
      auth: {
        user: 'admin@peculiargadgets.com.bd',
        pass: 'Hridoy@08112021'
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Send test email
    await transporter.sendMail({
      from: {
        name: "Nabil Amin Hridoy's Portfolio",
        address: 'admin@peculiargadgets.com.bd'
      },
      to: 'nabilaminhridoy@gmail.com',
      subject: 'Test Email from Portfolio',
      text: 'This is a test email to verify the email functionality is working.',
      html: '<p>This is a <strong>test email</strong> to verify the email functionality is working.</p>'
    });

    console.log('Test email sent successfully');

    return NextResponse.json(
      { 
        message: 'Test email sent successfully!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Test email error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
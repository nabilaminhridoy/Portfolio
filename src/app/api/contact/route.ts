import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';

// Fallback email function using a different configuration
async function sendFallbackEmail(name: string, email: string, message: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER || 'nabilaminhridoy@gmail.com',
      pass: process.env.GMAIL_PASS || 'your-app-password'
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000
  });

  const htmlEmailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #175BEA 0%, #00C5FB 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; padding: 40px 20px 30px; background: rgba(255,255,255,0.1);">
                <h1 style="color: white; margin: 20px 0 10px; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">New Message Received</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">From Your Portfolio Website</p>
            </div>
            
            <!-- Content Section -->
            <div style="background: white; padding: 40px; margin: 0 20px 20px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                <div style="background: linear-gradient(135deg, #175BEA 0%, #00C5FB 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 500;">Contact Form Submission</h2>
                </div>
                
                <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #175BEA;">
                    <div style="margin-bottom: 20px;">
                        <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">From:</strong>
                        <p style="margin: 0; font-size: 18px; color: #2c3e50; font-weight: 500;">${name}</p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Email:</strong>
                        <p style="margin: 0; font-size: 16px; color: #2c3e50;">
                            <a href="mailto:${email}" style="color: #00C5FB; text-decoration: none; font-weight: 500;">${email}</a>
                        </p>
                    </div>
                    
                    <div>
                        <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;">Message:</strong>
                        <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e9ecef; line-height: 1.6;">
                            <p style="margin: 0; color: #495057; font-size: 15px; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.GMAIL_USER || 'nabilaminhridoy@gmail.com',
    to: 'nabilaminhridoy@gmail.com',
    subject: `New Message Received from ${name}`,
    text: `New message from ${name} (${email}):\n\n${message}`,
    html: htmlEmailBody
  });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');

    // Save message to database
    try {
      await db.contactMessage.create({
        data: {
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage
        }
      });
      console.log(`Message saved to database from: ${sanitizedEmail}`);
    } catch (dbError) {
      console.error('Failed to save message to database:', dbError);
      // Continue with email sending even if database save fails
    }

    // Try primary email service first
    try {
      // Create SMTP transporter with connection timeout
      const transporter = nodemailer.createTransport({
        host: 'mail.peculiargadgets.com.bd',
        port: 465,
        secure: true, // SSL
        auth: {
          user: 'admin@peculiargadgets.com.bd',
          pass: 'Hridoy@08112021'
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000,    // 5 seconds
        socketTimeout: 10000      // 10 seconds
      });

      // Verify connection
      await transporter.verify();

      // Get current year for dynamic copyright
      const currentYear = new Date().getFullYear();

      // Enhanced HTML email template with gradient colors and logo
      const htmlEmailBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #175BEA 0%, #00C5FB 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
              
              <!-- Header with Logo -->
              <div style="text-align: center; padding: 40px 20px 30px; background: rgba(255,255,255,0.1);">
                  <img src="https://nabilaminhridoy.com/logo.png" alt="Nabil Amin Hridoy Logo" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                  <h1 style="color: white; margin: 20px 0 10px; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">New Message Received</h1>
                  <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">From Your Portfolio Website</p>
              </div>
              
              <!-- Content Section -->
              <div style="background: white; padding: 40px; margin: 0 20px 20px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                  <div style="background: linear-gradient(135deg, #175BEA 0%, #00C5FB 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                      <h2 style="margin: 0; font-size: 22px; font-weight: 500;">Contact Form Submission</h2>
                  </div>
                  
                  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #175BEA;">
                      <div style="margin-bottom: 20px;">
                          <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">From:</strong>
                          <p style="margin: 0; font-size: 18px; color: #2c3e50; font-weight: 500;">${sanitizedName}</p>
                      </div>
                      
                      <div style="margin-bottom: 20px;">
                          <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Email:</strong>
                          <p style="margin: 0; font-size: 16px; color: #2c3e50;">
                              <a href="mailto:${sanitizedEmail}" style="color: #00C5FB; text-decoration: none; font-weight: 500;">${sanitizedEmail}</a>
                          </p>
                      </div>
                      
                      <div>
                          <strong style="color: #175BEA; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;">Message:</strong>
                          <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e9ecef; line-height: 1.6;">
                              <p style="margin: 0; color: #495057; font-size: 15px; white-space: pre-wrap;">${sanitizedMessage}</p>
                          </div>
                      </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                      <a href="mailto:${sanitizedEmail}" style="display: inline-block; background: linear-gradient(135deg, #175BEA 0%, #00C5FB 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(23, 91, 234, 0.3);">
                          Reply to Message
                      </a>
                  </div>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; padding: 30px 20px; background: rgba(255,255,255,0.1); border-top: 1px solid rgba(255,255,255,0.2);">
                  <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px; font-size: 14px;">
                      © ${currentYear} Nabil Amin Hridoy. All rights reserved.
                  </p>
                  <p style="color: #000000; margin: 0; font-size: 12px;">
                      This is an automated message from your portfolio website contact form.
                  </p>
              </div>
          </div>
      </body>
      </html>
      `;

      // Plain text version for email clients that don't support HTML
      const textEmailBody = `
  Hi Hridoy,

  You've received a new message from your portfolio website contact form.  
  Here are the details:

  Name: ${sanitizedName}  
  Email: ${sanitizedEmail}  
  Message:
  ${sanitizedMessage}

  Please follow up as soon as possible if this inquiry is relevant.

  © ${currentYear} Nabil Amin Hridoy. All rights reserved.
  This is an automated message from your portfolio website.
      `.trim();

      // Send email
      await transporter.sendMail({
        from: {
          name: "Nabil Amin Hridoy's Portfolio",
          address: 'admin@peculiargadgets.com.bd'
        },
        to: 'nabilaminhridoy@gmail.com',
        subject: `New Message Received from ${sanitizedName}`,
        text: textEmailBody,
        html: htmlEmailBody
      });

      console.log(`Contact form submission from: ${sanitizedEmail} (primary service)`);

    } catch (primaryError) {
      console.warn('Primary email service failed, trying fallback:', primaryError);
      
      // Try fallback email service
      try {
        await sendFallbackEmail(sanitizedName, sanitizedEmail, sanitizedMessage);
        console.log(`Contact form submission from: ${sanitizedEmail} (fallback service)`);
      } catch (fallbackError) {
        console.error('Both email services failed:', fallbackError);
        // Don't throw error - message was saved to database
        console.log('Message saved to database but email sending failed');
      }
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      code: (error as any).code,
      command: (error as any).command,
      errno: (error as any).errno
    });
    
    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Mail server connection failed. Please try again later.' },
          { status: 500 }
        );
      }
      if (error.message.includes('ETIMEDOUT')) {
        return NextResponse.json(
          { error: 'Mail server timeout. Please try again later.' },
          { status: 500 }
        );
      }
      if (error.message.includes('auth')) {
        return NextResponse.json(
          { error: 'Mail authentication failed. Please contact administrator.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}
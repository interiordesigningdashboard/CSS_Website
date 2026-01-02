// templates/emails.js

/**
 * Admin notification email template
 * Sent to admin when new contact form is submitted
 */
export const adminEmailTemplate = (data) => {
  const { firstName, lastName, email, phone, company, service, message } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #f97316 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>

        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Contact Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;">Name</td>
              <td style="padding:12px;border:1px solid #e5e7eb;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;">Email</td>
              <td style="padding:12px;border:1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color:#2563eb">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;">Phone</td>
              <td style="padding:12px;border:1px solid #e5e7eb;">${
                phone || "Not provided"
              }</td>
            </tr>
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;">Company</td>
              <td style="padding:12px;border:1px solid #e5e7eb;">${
                company || "Not provided"
              }</td>
            </tr>
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;">Service</td>
              <td style="padding:12px;border:1px solid #e5e7eb;">${service}</td>
            </tr>
          </table>

          <h3 style="margin-top:30px;">Message</h3>
          <div style="background:white;padding:20px;border-left:4px solid #2563eb;">
            ${message}
          </div>
        </div>

        <div style="background:#1f2937;padding:20px;text-align:center;color:#9ca3af;">
          © 2025 Colors and Signage Solutions
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Customer confirmation email template
 * Sent to customer after they submit the contact form
 */
export const customerEmailTemplate = (data) => {
  const { firstName, service, message, company } = data;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <style>
        @font-face {
        font-family: 'Good Times';
        src: url('https://fonts.cdnfonts.com/css/good-times-2') format('truetype');
        font-weight: 300;
        font-style: normal;
      }

      .good-times {
        font-family: 'Good Times', sans-serif;
      }
      </style>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You</title>
    </head>
    <body style="margin:0;padding:0;background:#f3f4f6;">
      <div style="max-width:600px;margin:auto;background:white;font-family:Arial;">
        <div style="background:linear-gradient(135deg,#2563eb,#f97316);padding:40px;text-align:center;color:white;">
  
  <img
    src="https://raw.githubusercontent.com/interiordesigningdashboard/CSS_Website/main/app/assets/images/logo.jpg"
    alt="Colors & Signage Solutions Logo"
    style="width:60px;height:40px;display:block;margin:0 auto 12px;"
  />

  <h1>Thank You for Reaching Out!</h1>
</div>


        <div style="padding:30px;">
          <p>Hello ${firstName},</p>
          <p>
  Thank you for your interest in <strong>${service}</strong> and for choosing
  <strong>Colors and Signage Solutions</strong>. We’ve carefully received your
  inquiry and it is now under the attention of our experienced team.  
  <br /><br />
  Every project we undertake is approached with precision, creativity, and
  uncompromising quality. One of our specialists will be in touch with you
  shortly to understand your requirements in detail and guide you through the
  next steps with clarity and care.
</p>


         

          <p style="margin-top:20px;">
            We will contact you within <strong>24 hours</strong>.
          </p>
        </div>

        <div style="background:#1f2937;padding:20px;text-align:center;color:#9ca3af;  ">
          © 2025 <span class="good-times">Colors and Signage Solutions</span> All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

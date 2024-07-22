import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const reqBody = await request.json();
  const { searchParams, trackingNumber, status } = reqBody;

  console.log('Received request to send email with the following data:');
  console.log('Search Params:', searchParams);
  console.log('Tracking Number:', trackingNumber);
  console.log('Status:', status);

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL!,
      pass: process.env.PASSWORD!,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.EMAIL!,
    to: searchParams.emailaddress,
    subject: `Appointment ${status}: ${trackingNumber}`,
    text: `Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},

Your booking has been ${status}.

Booking Reference Number: ${trackingNumber}
Date & Time: ${searchParams.schedules}
Service: ${searchParams.serviceType}

Additional Requests: ${searchParams.additionalrequests}
Parking Required: ${searchParams.needsparking ? 'Yes' : 'No'}

Thank you for choosing our services!

Best Regards,
Indigo Studios`,
    html: `<p>Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},</p>
<p>Your booking has been ${status}.</p>
<p><b>Booking Reference Number:</b> ${trackingNumber}<br/>
<b>Date & Time:</b> ${searchParams.schedules}<br/>
<b>Service:</b> ${searchParams.serviceType}</p>
<p><b>Additional Requests:</b> ${searchParams.additionalrequests}<br/>
<b>Parking Required:</b> ${searchParams.needsparking ? 'Yes' : 'No'}</p>
<p>Thank you for choosing our services!</p>
<p>Best Regards,<br/>
Indigo Studios</p>`
  };

  console.log('Mail Data:', mailData);

  try {
    await transporter.sendMail(mailData);
    return new Response(JSON.stringify({ status: 'OK' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

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
    const { name, email, serviceType, question} = reqBody;

    console.log('Received request to send ticket with the following data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Service Type:', serviceType);
    console.log('Question:', question);

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
        to: process.env.EMAIL!,
        subject: `Ticket Submission from ${name}`,
        text: `We have received a new ticket submission. \n\nDetails:\n- Name: ${name}\n- Email: ${email}\n- Service Type: ${serviceType}\n\n\n-
        Question:\n ${question}`,
        html: `<p>You have received a new ticket submission.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Service Type:</strong> ${serviceType}</p>
               <p><strong>Question:</strong> ${question}</p>`
    };

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
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


    const mailData1 = {
        from: process.env.EMAIL!,
        to: process.env.EMAIL!,
        subject: `Ticket Submission from ${name}`,
        text: `We have received a new ticket submission. <br><br>Details:<br>- Name: ${name}<br>- Email: ${email}<br>- Service Type: ${serviceType}<br><br><br>-
        Question:<br> ${question}`,
        html: `<p>We have received a new ticket submission.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Service Type:</strong> ${serviceType}</p>
               <p><strong>Question:</strong> ${question}</p>`
    };

    console.log('wait...');

    const mailData2 = {
      from: process.env.EMAIL!,
      to: email!,
      subject: `Ticket Submission Confirmation`,
      text: `Dear ${name}, `,
      html: `
      <p> We have received your ticket submission. Thus, we would like to thank you in contributing to the betterment of our services. A response will be sent to this email soonest. Details for your ticket are written below: <br><br>Details:<br>- Name: ${name}<br>- Email: ${email}<br>- Service Type: ${serviceType}<br><br><br>-
      Question:<br> ${question}<br><br> Thank you for your understanding. </p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service Type:</strong> ${serviceType}</p>
             <p><strong>Question:</strong> ${question}</p>`
    };

    try {
        await transporter.sendMail(mailData1);
        await transporter.sendMail(mailData2);
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
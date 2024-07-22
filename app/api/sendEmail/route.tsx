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
    const { searchParams, trackingNumber } = reqBody;

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
        subject: `Appointment Confirmation: ${trackingNumber}`,
        text: `Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},

Your booking has been successfully submitted.

Booking Reference Number: ${trackingNumber}
Date & Time: ${JSON.stringify(searchParams.schedules)}
Service: ${searchParams.serviceType}

Additional Requests: ${searchParams.additionalrequests}
Parking Required: ${searchParams.needsparking === 'true' ? 'Yes' : 'No'}

Thank you for choosing our services!

Best Regards,
Indigo Studios`,
        html: `<p>Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},</p>
<p>Your booking has been successfully submitted.</p>
<p><b>Booking Reference Number:</b> ${trackingNumber}<br/>
<b>Date & Time:</b> ${JSON.stringify(searchParams.schedules)}<br/>
<b>Service:</b> ${searchParams.serviceType}</p>
<p><b>Additional Requests:</b> ${searchParams.additionalrequests}<br/>
<b>Parking Required:</b> ${searchParams.needsparking === 'true' ? 'Yes' : 'No'}</p>
<p>Thank you for choosing our services!</p>
<p>Best Regards,<br/>
Indigo Studios</p>`
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
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
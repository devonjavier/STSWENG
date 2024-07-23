import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

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
    const { searchParams, trackingNumber} = reqBody;

    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL!,
            pass: process.env.PASSWORD!,
        },
        secure: true,
    });

    const schedules = JSON.parse(searchParams.schedules).map((schedule:any) => `
        <div>
            <span>Date: ${formatDate(schedule.date)}</span><br/>
            <span>Time: ${schedule.starttime} - ${schedule.endtime}</span>
        </div>
    `).join('');

    let additionalpackage;
    if (JSON.parse(searchParams.additionalpackage).length === 0){
        additionalpackage = "NONE"
    }
    else{
        additionalpackage = JSON.parse(searchParams.additionalpackage)
    }

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
        html: `
<p>Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},</p>

<p>Greetings! This email is to inform you that your booking is still currently pending!</p>
<p>
To proceed with your booking, please complete the down payment. 
You can make your payment through any of our electronic wallets: 
GCash, PayMaya, or PayPal using the number (+63 969 647 5564).
</p>
<p>We will notify you as soon as your booking is confirmed.</p>
<br/>
<p> BOOKING DETAILS: </p>
<p><b>Booking Reference Number:</b> ${trackingNumber}<br/>
<p><b>Total Amount Due:</b> ${parseFloat(searchParams.mainprice) + parseFloat(searchParams.additionalprice)}<br/>
<b>Date & Time:</b> ${schedules}
<br/>
<b>Service:</b> ${searchParams.selectedServicetitle}</p>
<b>Additional service:</b> ${additionalpackage}</p>
<br/>
<p>
If you have any questions or need to make changes to your booking, 
please feel free to reply to this email or contact us via Facebook 
(@IndigoStudiosPH) and Instagram (@indigostudiosph).
</p>
<p>
Thank you for your patience and cooperation.
</p>
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
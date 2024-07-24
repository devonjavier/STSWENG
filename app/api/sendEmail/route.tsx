import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const formatDate = (dateString:string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined);
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


  let subject;
  let textBody;
  let htmlBody;

  switch (status) {
    case 'pending':
      subject = `Appointment Confirmation: ${trackingNumber}`;
      textBody = `Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},

Your booking has been successfully submitted.

Booking Reference Number: ${trackingNumber}
Date & Time: ${JSON.stringify(searchParams.schedules)}
Service: ${searchParams.serviceType}

Additional Requests: ${searchParams.additionalrequests}
Parking Required: ${searchParams.needsparking === 'true' ? 'Yes' : 'No'}

Thank you for choosing our services!

Best Regards,
Indigo Studios`,
      htmlBody = `
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
      break;
    case 'accepted':
      subject = `Booking Status Confirmation for ${trackingNumber}`;
      textBody = `Dear ${searchParams.maincustomerfirstname},

Greetings! This email is to inform you that your booking has been successfully accepted!

Please proceed to your appointment according to the date you booked.

---------------------------------------------------------------------------------------------------------------------
BOOKING DETAILS

Package Selected: ${searchParams.serviceType}
Date: ${searchParams.schedules}
Time: ${searchParams.schedules}
Reference Number: ${trackingNumber}
---------------------------------------------------------------------------------------------------------------------

If you have any questions or need to make changes to your booking, please feel free to reply to this email or contact us via Facebook (@IndigoStudiosPH) and Instagram (@indigostudiosph).

Thank you for choosing Indigo Studios. We look forward to serving you!

Best regards,
Indigo Studios Ph`;
      htmlBody = `<p>Dear ${searchParams.maincustomerfirstname},</p>
<p>Greetings! This email is to inform you that your booking has been successfully accepted!</p>
<p>Please proceed to your appointment according to the date you booked.</p>
<hr>
<p><b>BOOKING DETAILS</b></p>
<p>Package Selected: ${searchParams.serviceType}<br>
Date: ${searchParams.schedules}<br>
Time: ${searchParams.schedules}<br>
Reference Number: ${trackingNumber}</p>
<hr>
<p>If you have any questions or need to make changes to your booking, please feel free to reply to this email or contact us via Facebook (@IndigoStudiosPH) and Instagram (@indigostudiosph).</p>
<p>Thank you for choosing Indigo Studios. We look forward to serving you!</p>
<p>Best regards,<br>
Indigo Studios Ph</p>`;
      break;

    case 'submitted':
      subject = `Booking Status Confirmation for ${trackingNumber}`;
      textBody = `Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},
Your booking has been successfully submitted.
Booking Reference Number: ${trackingNumber}
Date & Time: ${JSON.stringify(searchParams.schedules)}
Service: ${searchParams.serviceType}
Additional Requests: ${searchParams.additionalrequests}
Parking Required: ${searchParams.needsparking === 'true' ? 'Yes' : 'No'}
Thank you for choosing our services!
Best Regards,
Indigo Studios`,
        htmlBody = `<p>Dear ${searchParams.maincustomerfirstname} ${searchParams.maincustomerlastname},</p>
<p>Your booking has been successfully submitted.</p>
<p><b>Booking Reference Number:</b> ${trackingNumber}<br/>
<b>Date & Time:</b> ${JSON.stringify(searchParams.schedules)}<br/>
<b>Service:</b> ${searchParams.serviceType}</p>
<p><b>Additional Requests:</b> ${searchParams.additionalrequests}<br/>
<b>Parking Required:</b> ${searchParams.needsparking === 'true' ? 'Yes' : 'No'}</p>
<p>Thank you for choosing our services!</p>
<p>Best Regards,<br/>
Indigo Studios</p>`
      break;

    case 'rejected':
      subject = `Booking Status Confirmation for ${trackingNumber}`;
      textBody = `Dear ${searchParams.maincustomerfirstname},


Thank you for choosing Indigo Studios PH. We regret to inform you that your booking request has been declined.

Unfortunately, we are unable to accommodate your booking at this time due to [reason, if appropriate to include, e.g., scheduling conflicts, capacity limits, etc.]. We apologize for any inconvenience this may cause.

---------------------------------------------------------------------------------------------------------------------
BOOKING DETAILS

Package Selected: ${searchParams.serviceType}
Date: ${searchParams.schedules}
Time: ${searchParams.schedules}
Reference Number: ${trackingNumber}
---------------------------------------------------------------------------------------------------------------------

If you would like to reschedule or have any questions, please feel free to reply to this email or contact us via Facebook (@IndigoStudiosPH) and Instagram (@indigostudiosph).

Thank you for your understanding and we hope to serve you in the future.

Best regards,
Indigo Studios Ph`;
      htmlBody = `<p>Dear ${searchParams.maincustomerfirstname},</p>
<p>Thank you for choosing Indigo Studios PH. We regret to inform you that your booking request has been declined.</p>
<p>Unfortunately, we are unable to accommodate your booking at this time due to [reason, if appropriate to include, e.g., scheduling conflicts, capacity limits, etc.]. We apologize for any inconvenience this may cause.</p>
<hr>
<p><b>BOOKING DETAILS</b></p>
<p>Package Selected: ${searchParams.serviceType}<br>
Date: ${searchParams.schedules}<br>
Time: ${searchParams.schedules}<br>
Reference Number: ${trackingNumber}</p>
<hr>
<p>If you would like to reschedule or have any questions, please feel free to reply to this email or contact us via Facebook (@IndigoStudiosPH) and Instagram (@indigostudiosph).</p>
<p>Thank you for your understanding and we hope to serve you in the future.</p>
<p>Best regards,<br>
Indigo Studios Ph</p>`;
      break;

    default:
      return new Response(JSON.stringify({ error: 'Invalid status' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  const mailData = {
    from: process.env.EMAIL!,
    to: searchParams.emailaddress,
    subject: subject,
    text: textBody,
    html: htmlBody,
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

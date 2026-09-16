
const { Resend } = require("resend");
const fs = require("fs");
const path = require("path");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendQuotationEmail = async (order, pdfBuffer) => {
  let mailOptions;

  const logoPath = path.join(
    __dirname,
    "../backendAssets/emailstamp2.0.png"
  );

  const logoBuffer = fs.readFileSync(logoPath);

  if (order.service_type === "courier") {
    mailOptions = {
      from: "Unbroken Solutions <quotes@unbrokensolutions.co.za>",
      replyTo: "tshabalalanathi7@gmail.com",
      to: [order.email],
      cc: [process.env.COMPANY_EMAIL],
      subject: `Unbroken Solutions Quotation for - ${order.company_name}`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 30px;
          color: #222;
          line-height: 1.6;
        ">

          <p style="font-size: 16px;">
            Hello ${order.contact_name},
          </p>

          <p style="font-size: 16px;">
            Thank you for choosing Unbroken Solutions.
          </p>

          <p style="font-size: 16px;">
            Your requested shipping quotation has been prepared and is
            attached to this email as a PDF.
          </p>

          <p style="font-size: 16px;">
            Please review the attached quotation. Should you have any questions
            or require any changes, feel free to reply to this email.
          </p>

          <p style="
            margin-top: 35px;
            font-size: 15px;
          ">
            Kind regards,<br>
            <strong>Unbroken Solutions</strong>
          </p>

          <div style="
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
          ">
            <img
              src="cid:unbroken-logo"
              alt="Unbroken Solutions"
              style="
                width: 320px;
                height: auto;
                display: block;
                margin-top: 25px;
              "
            >
          </div>

        </div>
      `,

      attachments: [
        {
          filename: `Unbroken Solutions Quote-${order.company_name}.pdf`,
          content: pdfBuffer.toString("base64"),
          contentType: "application/pdf",
        },
        {
          filename: "emailstamp.png",
          content: logoBuffer.toString("base64"),
          contentType: "image/png",
          contentId: "unbroken-logo",
        },
      ],
    };
  } else {
    mailOptions = {
      from: "Unbroken Solutions <info@unbrokensolutions.co.za>",
      to: [order.email],
      cc: [process.env.COMPANY_EMAIL],
      subject: `Unbroken Solutions Enquiry for - ${order.company_name}`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 30px;
          color: #222;
          line-height: 1.6;
        ">

          <p style="font-size: 16px;">
            Hello ${order.contact_name},
          </p>

          <p style="font-size: 16px;">
            Thank you for contacting Unbroken Solutions.
            We have received your enquiry.
          </p>

          <p style="font-size: 16px;">
            Our team will review your requirements and source the
            best available price for your shipment. We will contact
            you with the relevant details.
          </p>

          <p style="
            margin-top: 35px;
            font-size: 15px;
          ">
            Kind regards,<br>
            <strong>Unbroken Solutions</strong>
          </p>

          <div style="
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
          ">
            <img
              src="cid:unbroken-logo"
              alt="Unbroken Solutions"
              style="
                width: 320px;
                height: auto;
                display: block;
                margin-top: 25px;
              "
            >
          </div>

        </div>
      `,

      attachments: [
        {
          filename: "emailstamp.png",
          content: logoBuffer.toString("base64"),
          contentType: "image/png",
          contentId: "unbroken-logo",
        },
      ],
    };
  }
  //https api call that avoids smtp problem
  const { data, error } = await resend.emails.send(mailOptions);

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message || "Failed to send email");
  }

  return data;
};

module.exports = sendQuotationEmail;
/*moved away from nodemailer as ran into issues with smtp, as the free
render version doesnt support it*/

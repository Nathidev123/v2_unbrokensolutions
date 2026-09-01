
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendQuotationEmail = async (order, pdfBuffer) => {

    let mailOptions 

        if(order.service_type === 'courier') {

        mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            cc: process.env.COMPANY_EMAIL,
            subject: `Unbroken Solutions Quotation for - ${order.company_name}`,
            text: `Hello ${order.contact_name},
        
        Thank you for choosing us.
        
        Please find your quotation attached to this email.
        
        Kind regards,
        Unbroken Solutions`,
        attachments: [
            {
                filename: `Unbroken Solutions Quote-${order.company_name}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    }
}
    else {
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            cc: process.env.COMPANY_EMAIL,
            subject: `Unbroken Solutions Enquiry for - ${order.company_name}`,
            text: `Hello ${order.contact_name},
        
        Thank you for contacting Unbroken Solutions. We have received 
        your enquiry.

        Our team will review your requirements and source the best available
        price for your shipment. We will contact you with the relevant details.
               
        Kind regards,
        Unbroken Solutions`
        }
    }

    const info = await transporter.sendMail(mailOptions)
    return info
}

module.exports = sendQuotationEmail
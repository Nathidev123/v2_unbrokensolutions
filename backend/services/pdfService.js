const {jsPDF} = require('jspdf')

//Quote generator
   const generateQuotationPDF = (order) => {
        const distanceKm = Number(order.distanceKm) / 1000

        const durationSeconds = parseInt(order.durationSeconds)
        const durationMinutes = durationSeconds / 60

        const doc = new jsPDF()
        const y = 20 

        doc.setFontSize(18)
        doc.text(order.company_name, 15, y)
        
        doc.setFontSize(16)
        doc.text('Quotation', 15, y + 10)

        doc.setFontSize(12)
        
        doc.text(
                    [
            `Contact Name: ${order.contact_name}`,
            `Email: ${order.email}`,
            `Phone: ${order.phone}`,
            `Street Address: ${order.street_address}`,
            `City: ${order.city}`,
            `Province: ${order.province}`,
            `Postal Code: ${order.postal_code}`,

            "",
            "────────────────────────────────",
            `Recipient Company: ${order.recipient_company}`,
            `Street Address: ${order.recipient_street_address}`,
            `City: ${order.recipient_city}`,
            `Province: ${order.recipient_province}`,

            "",
            "────────────────────────────────",
            `Weight: ${order.weight}`,
            `Height: ${order.height}`,
            `Length: ${order.length}`,
            `Width: ${order.width}`,

            "",

            `Package Contents: ${order.package_contents}`,
            `Parcel Value: R${order.parcel_value}`,
            `Package Name: ${order.package_name}`,
            `Delivery Speed: ${order.delivery_speed}`,
            `Distance: ${distanceKm.toFixed(2)} km`,
            `Duration: ${durationMinutes.toFixed(0)} min`,

            "",
            "────────────────────────────────",
            "",
            `Estimated Amount: R${order.quoteAmount.toFixed(2)}`   
                    ],
                    15,
                    y + 30,
                    { lineHeightFactor: 1.5 }
        )
         
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
        return pdfBuffer
        
    }
    
    module.exports = generateQuotationPDF
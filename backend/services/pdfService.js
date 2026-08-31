

//Quote generator
   const generateQuotationPDF = () => {
        const doc = new jsPDF()
        const y = 20 

        doc.setFontSize(18)
        doc.text(order.company_name, 15, y)

        doc.setFontSize(16)
        doc.text('Quotation', 15, y + 10)

        doc.setFontSize(12)
        new Date('1970-01-01').toLocaleDateString()
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
    `Parcel Value: ${order.parcel_value}`,
    `Package Name: ${order.package_name}`,
    `Shipment Option: ${order.shipment_options}`,
    `Distance: ${distanceKm.toFixed(1)} km`,
    `Duration: ${durationMinutes} min`,

    "",
    "────────────────────────────────",
    "",
    `Estimated Amount: R${estimatedAmount.toFixed(2)}`   
            ],
            15,
            y + 30,
            { lineHeightFactor: 1.5 }
        )
         doc.save(`Unbroken Solutions Quote-${order.company_name}.pdf`)
        //takes pdf built and returns it as a Base64 Data
        //URI string, which is the format EmailJS expects for
        //attachment
        //so basically hand the pdf as an attachment in the email
    }
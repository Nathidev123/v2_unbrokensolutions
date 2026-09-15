const { jsPDF } = require("jspdf");

// Quote generator
const generateQuotationPDF = (order) => {
  const distanceKm = Number(order.distanceKm) / 1000;

  const durationSeconds = parseInt(order.durationSeconds);
  const durationMinutes = durationSeconds / 60;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --------------------------------------------------
  // COLOURS
  // --------------------------------------------------

  const dark = [30, 30, 30];
  const grey = [105, 105, 105];
  const lightGrey = [245, 245, 245];
  const borderGrey = [220, 220, 220];
  const white = [255, 255, 255];

  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("UNBROKEN SOLUTIONS", 15, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text("LOGISTICS & SHIPPING", 15, 21);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);

  doc.text("QUOTATION", pageWidth - 15, 15, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    `Date: ${new Date().toLocaleDateString("en-ZA")}`,
    pageWidth - 15,
    22,
    { align: "right" },
  );

  // --------------------------------------------------
  // QUOTATION REFERENCE
  // --------------------------------------------------

  let y = 45;

  doc.setTextColor(...dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("Quotation For", 15, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(order.company_name || "Customer", 15, y + 7);

  // --------------------------------------------------
  // CUSTOMER INFORMATION
  // --------------------------------------------------

  y += 18;

  doc.setFillColor(...lightGrey);
  doc.roundedRect(15, y, 85, 48, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...dark);

  doc.text("CUSTOMER DETAILS", 20, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grey);

  doc.text(`Contact: ${order.contact_name || "-"}`, 20, y + 17);
  doc.text(`Email: ${order.email || "-"}`, 20, y + 24);
  doc.text(`Phone: ${order.phone || "-"}`, 20, y + 31);

  const customerAddress = [
    order.street_address,
    order.city,
    order.province,
    order.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  const customerAddressLines = doc.splitTextToSize(customerAddress || "-", 70);

  doc.text("Address:", 20, y + 38);

  doc.text(customerAddressLines, 20, y + 43);

  // --------------------------------------------------
  // RECIPIENT INFORMATION
  // --------------------------------------------------

  doc.setFillColor(...lightGrey);
  doc.roundedRect(110, y, 85, 48, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...dark);

  doc.text("DELIVERY DETAILS", 115, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grey);

  doc.text(`Company: ${order.recipient_company || "-"}`, 115, y + 17);

  const recipientAddress = [
    order.recipient_street_address,
    order.recipient_city,
    order.recipient_province,
  ]
    .filter(Boolean)
    .join(", ");

  const recipientAddressLines = doc.splitTextToSize(
    recipientAddress || "-",
    70,
  );

  doc.text("Address:", 115, y + 26);

  doc.text(recipientAddressLines, 115, y + 32);

  // --------------------------------------------------
  // SHIPMENT DETAILS
  // --------------------------------------------------

  y += 60;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...dark);

  doc.text("SHIPMENT DETAILS", 15, y);

  y += 7;

  // Table background
  doc.setFillColor(...dark);
  doc.roundedRect(15, y, 180, 9, 2, 2, "F");

  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);

  doc.text("DESCRIPTION", 20, y + 6);
  doc.text("DETAILS", 125, y + 6);

  y += 9;

  const shipmentDetails = [
    ["Package", order.package_name || "-"],
    ["Contents", order.package_contents || "-"],
    ["Weight", `${order.weight || "-"} kg`],
    [
      "Dimensions",
      `${order.length || "-"} × ${order.width || "-"} × ${order.height || "-"} cm`,
    ],
    ["Delivery Speed", order.delivery_speed || "-"],
    ["Distance", `${distanceKm.toFixed(2)} km`],
    ["Estimated Transit Time", `${durationMinutes.toFixed(0)} min`],
    ["Parcel Value", `R${Number(order.parcel_value || 0).toFixed(2)}`],
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  shipmentDetails.forEach((item, index) => {
    const rowHeight = 9;

    if (index % 2 === 0) {
      doc.setFillColor(...lightGrey);
      doc.rect(15, y, 180, rowHeight, "F");
    }

    doc.setTextColor(...grey);
    doc.text(item[0], 20, y + 6);

    doc.setTextColor(...dark);

    const detailLines = doc.splitTextToSize(String(item[1]), 65);

    doc.text(detailLines, 125, y + 6);

    y += rowHeight;
  });

  // --------------------------------------------------
  // QUOTATION TOTAL
  // --------------------------------------------------

  y += 12;

  doc.setFillColor(...dark);
  doc.roundedRect(115, y, 80, 28, 2, 2, "F");

  doc.setTextColor(...white);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text("ESTIMATED QUOTATION", 155, y + 9, {
    align: "center",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);

  doc.text(`R${Number(order.quoteAmount || 0).toFixed(2)}`, 155, y + 20, {
    align: "center",
  });

  // --------------------------------------------------
  // NOTE
  // --------------------------------------------------

  y += 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...dark);

  doc.text("IMPORTANT", 15, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grey);

  const note = doc.splitTextToSize(
    "This quotation is based on the shipment information provided and is subject to confirmation by Unbroken Solutions. Final charges may vary if shipment details change.",
    180,
  );

  doc.text(note, 15, y + 7, {
    lineHeightFactor: 1.5,
  });

  // --------------------------------------------------
  // FOOTER
  // --------------------------------------------------

  doc.setDrawColor(...borderGrey);
  doc.line(15, pageHeight - 24, pageWidth - 15, pageHeight - 24);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...dark);

  doc.text("Unbroken Solutions", 15, pageHeight - 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...grey);

  doc.text(
    "Professional logistics. Delivered with purpose.",
    15,
    pageHeight - 11,
  );

  doc.text(
    "Thank you for choosing Unbroken Solutions.",
    pageWidth - 15,
    pageHeight - 13,
    { align: "right" },
  );

  // --------------------------------------------------
  // PDF BUFFER
  // --------------------------------------------------

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return pdfBuffer;
};

module.exports = generateQuotationPDF;

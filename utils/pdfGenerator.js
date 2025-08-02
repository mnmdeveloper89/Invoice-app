const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoicePDF = (customer, items) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `invoice_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../invoices', filename);

    doc.pipe(fs.createWriteStream(filepath));

    doc.fontSize(20).text('FAKTURA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Kupac: ${customer.name}`);
    doc.text(`Email: ${customer.email}`);
    doc.moveDown();

    doc.text('Stavke:');
    let total = 0;

    items.forEach((item, index) => {
      const { name, quantity, price } = item;
      const lineTotal = quantity * price;
      total += lineTotal;
      doc.text(`${index + 1}. ${name} x${quantity} - ${lineTotal} KM`);
    });

    doc.moveDown();
    doc.text(`Ukupno: ${total} KM`, { bold: true });

    doc.end();

    doc.on('finish', () => resolve(filename));
    doc.on('error', reject);
  });
};

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { generateInvoiceHTML } = require('./htmlGenerator');

exports.generateInvoiceWithPuppeteer = async (customer, items) => {
  try {
    console.log("🔧 Generišem HTML...");
    const html = generateInvoiceHTML(customer, items);

    const filename = `invoice_html_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../invoices', filename);

    const invoiceDir = path.join(__dirname, '../invoices');
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir);
    } 

    console.log("🚀 Start browser...");
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    console.log("📄 HTML Page...");

    await page.setContent(html, { waitUntil: 'networkidle0' });

    console.log("💾 Saved in PDF:", filepath);
    await page.pdf({ path: filepath, format: 'A4', printBackground: true });

    await browser.close();
    console.log("✅ PDF generate:", filename);

    return filename;
  } catch (err) {
    console.error("❌ Error in Puppeteer generated:", err);
    throw err;
  }
};

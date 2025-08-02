const { generateInvoicePDF } = require('../utils/pdfGenerator');

exports.createInvoice = async (req, res) => {
  const { customer, items } = req.body;

  try {
    const filename = await generateInvoicePDF(customer, items);
    res.json({ message: 'Faktura uspešno generisana', file: filename });
  } catch (err) {
    res.status(500).json({ error: 'Greška prilikom generisanja fakture' });
  }
};

const { generateInvoiceWithPuppeteer } = require('../utils/pdfWithPuppeteer');

exports.createInvoiceHTML = async (req, res) => {
  const { customer, items } = req.body;

  try {
    const filename = await generateInvoiceWithPuppeteer(customer, items);
    res.json({ message: 'HTML faktura generisana', file: filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška kod HTML fakture' });
  }
};

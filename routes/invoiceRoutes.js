const express = require('express');
const router = express.Router();
const { createInvoice } = require('../controllers/invoiceController');
const { createInvoiceHTML } = require('../controllers/invoiceController');

router.post('/html', createInvoiceHTML);

router.post('/', createInvoice);

module.exports = router;

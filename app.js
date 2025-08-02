const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/invoice', invoiceRoutes);

app.listen(3000, () => {
  console.log('Server pokrenut na http://localhost:3000');
});

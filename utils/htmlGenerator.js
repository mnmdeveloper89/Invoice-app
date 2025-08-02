exports.generateInvoiceHTML = (customer, items) => {
  let itemsHTML = '';
  let total = 0;

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    itemsHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price} KM</td>
        <td>${lineTotal} KM</td>
      </tr>`;
  });

  return `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 30px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>FAKTURA</h1>
      <p><strong>Kupac:</strong> ${customer.name} <br>
      <strong>Email:</strong> ${customer.email}</p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quality</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>${itemsHTML}</tbody>
      </table>

      <p class="total">Pay: ${total} KM</p>
    </body>
    </html>
  `;
};

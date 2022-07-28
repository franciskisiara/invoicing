const express = require("express");
const bodyParser = require("body-parser");
const { permit, setup } = require("./src/middleware");

// Implement A Swagger API Documentation Page
const swaggerDocument = require("./swagger/config");
const InvoiceController = require("./src/controllers/InvoiceController");
const StoreInvoiceValidator = require("./src/validators/StoreInvoiceValidator");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use([ setup, permit ]);

app.get("/invoices", InvoiceController.index);
app.post("/invoices", StoreInvoiceValidator, InvoiceController.store);

// app.get("/invoices/:id", (req, res) => {
//   const invoiceId = req.params.id
//   //check if invoice exists and belongs to the customer trying to retrieve it
//   res.json({ message: "Find invoice by id" });
// });

// app.put("/invoices/:id", (req, res) => {
//   // Implement Updating An Invoice By Id Using Best Practices
//   res.json({ message: "Update an invoice by id" });
// });

// app.delete("/invoices/:id", (req, res) => {
//   // Implement Deleting An Invoice By Id Using Best Practices
//   res.json({ message: "Delete an invoice by id" });
// });

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const { pick } = require("lodash")
const { validationResult } = require('express-validator');
const { sequelize, Invoice, InvoiceDetail, User } = require("../models")

module.exports.index = () => {}

module.exports.store = async (req, res) => {
  const errors = validationResult(req).array();

  if (errors.length !== 0) {
    return res.status(422).json({ errors });
  }

  const invoice = await sequelize.transaction(async (t) => {
    const lastInvoice = await Invoice.findOne({
      limit: 1,
      order: [
        ['id', 'DESC']
      ]
    });
  
    const invoice = await Invoice.create({
      status: "unpaid",
      invoiced_at: Date(),
      cost_summary: "calculate from the details",
      invoice_number: parseInt(lastInvoice?.invoice_number || 0) + 1,
      ...pick(req.body, [
        "title", 
        "customer_id", 
        "expiring_at",
      ]),
    });
  
    const invoiceDetails = req.body.invoice_details.map((detail) => {
      return {
        ...detail,
        invoice_id: invoice.id,
      }
    });
    await InvoiceDetail.bulkCreate(invoiceDetails);

    return pick(invoice, [
      "id",
      "invoice_number", 
      "title", 
      "status", 
      "customer_id",
      "invoiced_at", 
      "cost_summary",
      "expiring_at",
    ])
  });

  return res.status(201).json({
    data: invoice,
    message: 'Invoice details saved successfully',
  });
}
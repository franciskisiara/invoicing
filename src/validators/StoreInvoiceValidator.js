const { body } = require('express-validator');
const { User } = require("../models");

module.exports = [
  body('title')
    .notEmpty()
    .withMessage("The invoice title is required")
    .isString()
    .withMessage("The invoice title must be a string"),

  body('expiring_at')
    .notEmpty()
    .withMessage("The expiration date is requried")
    .isISO8601()
    .toDate()
    .withMessage("The expiration date format is invalid"),

  body('customer_id') 
    .notEmpty()
    .withMessage("The customer ID is required")
    .custom(async (customerId, { req }) => {
      const customer = await User.findByPk(customerId)

      if (customer === null) {
        return Promise.reject('Customer does not exist');
      }

      if (customerId === req.user.id) {
        return Promise.reject('You cannot invoice yourself');
      }
    }),
  
  body('invoice_details')
    .notEmpty()
    .withMessage("The invoice details field is required")
    .isArray()
    .withMessage("The invoice details must be an array"),

  body('invoice_details.*.description')
    .notEmpty()
    .withMessage("The invoice detail's description is required")
    .isString()
    .withMessage("The invoice details must be an array"),

  body('invoice_details.*.total_cost')
    .notEmpty()
    .withMessage("The invoice detail's total cost is required")
    .isNumeric()
    .withMessage("The invoice detail's total cost must be numeric"),
]
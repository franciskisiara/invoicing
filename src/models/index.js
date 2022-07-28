require('dotenv').config();

const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, `../../database/${process.env.DATABASE}.sqlite`),
  logging: false,
})

const Invoice = require("./Invoice")(sequelize, DataTypes)
const InvoiceDetail = require("./InvoiceDetail")(sequelize, DataTypes)
const User = require("./User")(sequelize, DataTypes)

User.hasMany(Invoice, {
  foreignKey: {
    name: "customer_id",
    allowNull: false,
  }
});

Invoice.belongsTo(User, {
  foreignKey: {
    name: "customer_id",
    allowNull: false,
  }
});

Invoice.hasMany(InvoiceDetail, {
  foreignKey: {
    name: "invoice_id",
    allowNull: false,
  }
});

InvoiceDetail.belongsTo(Invoice, {
  foreignKey: {
    name: "invoice_id",
    allowNull: false,
  }
});

exports.sequelize = sequelize
exports.Invoice = Invoice
exports.InvoiceDetail = InvoiceDetail
exports.User = User
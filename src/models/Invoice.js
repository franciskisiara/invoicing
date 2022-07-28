module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost_summary: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "unpaid", "paid", "expired"),
      defaultValue: "pending",
    },
    invoiced_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiring_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    underscored: true,
    paranoid: true,
  })

  return Invoice
};
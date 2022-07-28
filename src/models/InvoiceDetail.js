module.exports = (sequelize, DataTypes) => {
  const InvoiceDetail = sequelize.define("InvoiceDetail", {
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.DECIMAL.UNSIGNED,
      allowNull: false,
    },
  }, {
    underscored: true,
    timestamps: false,
  })

  return InvoiceDetail
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    account_type: {
      type: DataTypes.ENUM([
        "admin", "client"
      ]),
      allowNull: false,
      defaultValue: "client",
    }
  }, {
    underscored: true,
  });

  return User;
}
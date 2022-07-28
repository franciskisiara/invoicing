const { sequelize } = require("../src/models");

exports.migrate = () => {
  return async function () {
    await sequelize.sync({ force: true });
  };
};

exports.rollback = () => {
  return async function () {
    return await sequelize.drop();
  };
};

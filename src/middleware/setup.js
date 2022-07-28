const { sequelize, User } = require("../models");

const runSeeders = async () => {
  await User.bulkCreate([
    { name: "Frank", email: "frank@invoice.org", account_type: 'admin' },
    { name: "Kevin", email: "kevin@invoice.org", account_type: 'client' },
    { name: "Luffy", email: "luffy@invoice.org", account_type: 'client' },
  ], { 
    ignoreDuplicates: true 
  })
}

module.exports = async (req, res, next) => {
  await sequelize.sync()
  await runSeeders()
  next()
}
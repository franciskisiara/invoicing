module.exports = {
  run: async (user) => {
    user.bulkCreate([
      { name: "Frank", email: "frank@invoice.org" },
      { name: "Kevin", email: "kevin@invoice.org" },
      { name: "Luffy", email: "luffy@invoice.org" },
    ], { 
      ignoreDuplicates: true 
    })
  }
};


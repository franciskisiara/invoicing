const { User } = require('../models');

const adminRoutes = [
  '/invoices'
];

module.exports = async (req, res, next) => {
  const email = req.headers.email

  if (!email) {
    const status = 401
    const message = 'Missing user identification'

    console.log({
      path: `{${status}} ${req.path}`,
      message,
    });

    return res.status(status).json({ message });
  }

  req.user = await User.findOne({ 
    where: { 
      email: email
    }
  });


  if (req.user == null) {
    const status = 404
    const message = 'User does not exist'

    console.log({
      path: `{${status}} ${req.path}`,
      message,
    });

    return res.status(status).json({ message });
  }

  const userNotAdmin = req.user.account_type !== 'admin'
  const isAdminRoute = adminRoutes.includes(req.path)

  if (userNotAdmin && isAdminRoute) {
    const status = 403
    const message = 'Insufficient privileges'

    console.log({
      path: `{${status}} ${req.path}`,
      message,
    });

    return res.status(status).json({ message });
  }

  next()
}
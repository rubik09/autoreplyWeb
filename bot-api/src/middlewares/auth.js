const Admins = require('../models/admins');

const auth = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({ error: 'No token present!' });
  }

  const user = await Admins.getAdminByToken(token);

  if (!user) {
    return res.status(401).send({ error: 'Wrong token!' });
  }

  req.user = user;

  next();
};

module.exports = auth;

const jwt = require('jsonwebtoken');
const { Error } = require('../utils/Error');
const { verifyToken } = require('../middlewares/jwt.middleware');
const config = require('../commons/config');
const User = require('../modules/users/user.model');

exports.isAuth = async (req, res, next) => {
  try {
   
    if (!req.header('Authorization')) {
      throw new Error({
        statusCode: 401,
        message: 'token.notFound',
        messages: { auth: 'token not found' },
      });
    }
    const token = req.header('Authorization').replace('Bearer ', '');
  
    const decoded = await verifyToken(token, config.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error({
        statusCode: 401,
        message: 'token.invalid',
        messages: { auth: 'invalid token' },
      });
    }

    const user = await User.findOne({ _id: decoded.data._id, status: 'active' });
    if (!user) {
      throw new Error({
        statusCode: 401,
        message: 'user.isDisabled',
        messages: { user: 'user is disabled' },
      });
    }
    req.user = user;
  
    next();
  } catch(error) {
    next(error);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  const error = new Error({
    statusCode: 401,
    message: 'permission.notAdmin',
    messages: { auth: 'do not have permission' },
  });
  next(error);
  // return res.status(401).send({ message: 'Admin Token is not valid.' });
};

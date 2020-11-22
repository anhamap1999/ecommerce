const jwt = require('jsonwebtoken');
const { Error } = require('../utils/Error');
const { verifyToken } = require('../middlewares/jwt.middleware');
const config = require('../commons/config');

exports.isAuth = (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      throw new Error({
        statusCode: 401,
        message: 'token.notFound',
        error: 'token not found',
      });
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = verifyToken(token, config.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error({
        statusCode: 401,
        message: 'token.invalid',
        error: 'invalid token',
      });
    }
    req.user = decoded;
    next();
  } catch(error) {
    next(error);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
  const error = new Error({
    statusCode: 401,
    message: 'permission.notAdmin',
    error: '',
  });
  next(error);
  // return res.status(401).send({ message: 'Admin Token is not valid.' });
};

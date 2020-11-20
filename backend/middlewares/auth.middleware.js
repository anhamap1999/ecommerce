const jwt = require('jsonwebtoken');
const { Error } = require('../utils/Error');

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        throw new Error({
          statusCode: 401,
          message: 'token.invalid',
          error: 'invalid token',
        });
        // return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    throw new Error({
      statusCode: 401,
      message: 'token.notFound',
      error: 'token not found',
    });
    // return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  throw new Error({
    statusCode: 401,
    message: 'permission.notAdmin',
    error: '',
  });
  // return res.status(401).send({ message: 'Admin Token is not valid.' });
};

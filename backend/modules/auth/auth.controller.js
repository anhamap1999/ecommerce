const {
  generateToken,
  verifyToken,
} = require('../../middlewares/jwt.middleware');
const config = require('../../commons/config');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const User = require('../users/user.model');


exports.loginByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }
    const compare_result = await bcrypt.compare(password, user.password);
    if (!compare_result) {
      throw new Error({
        statusCode: 400,
        message: 'user.passwordIsIncorrect',
        error: 'password is incorrect',
      });
    }
    const accessToken = await generateToken(
      user,
      config.JWT_SECRET_KEY,
      config.JWT_TOKEN_LIFE
    );

    user.access_tokens.push({ token: accessToken });
    await user.save();

    const data = {
      access_token: accessToken,
      user: {
        _id: user._id,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        full_name: user.full_name,
      },
    };
    const success = new Success({ data });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.loginByPhone = async (req, res, next) => {
  try {
    const { phone_number, password } = req.body;
    const user = await User.findOne({
      phone_number: phone_number,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }
    const compare_result = await bcrypt.compare(password, user.password);
    if (!compare_result) {
      throw new Error({
        statusCode: 400,
        message: 'user.passwordIsIncorrect',
        error: 'password is incorrect',
      });
    }
    const accessToken = await generateToken(
      user,
      config.JWT_SECRET_KEY,
      config.JWT_TOKEN_LIFE
    );

    user.access_tokens.push({ token: accessToken });
    console.log(accessToken)
    await user.save();

    const data = {
      access_token: accessToken,
      user: {
        _id: user._id,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        full_name: user.full_name,
      },
    };
    const success = new Success({ data });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization').replace('Bearer ', '');
    const user = req.user;

    // const user = await verifyToken(accessToken, config.JWT_SECRET_KEY);

    const indexFound = user.access_tokens.findIndex((tokens) => {
      return tokens.token === accessToken;
    });

    user.access_tokens.splice(indexFound, 1);

    await user.save();

    const success = new Success();
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }
    const resetPasswordToken = await jwtHelper.generateToken(
      user,
      config.RESET_PASSWORD_SECRET_KEY,
      config.RESET_PASSWORD_TOKEN_LIFE
    );

    //res.json(`http://localhost:27017/user/reset-password/${resetPasswordToken}`);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tuananhtruong1950@gmail.com',
        pass: 'tuananhtruong1950',
      },
    });
    const mailOptions = {
      to: user.email,
      from: 'tuananhtruong1950@gmail.com',
      subject: 'Reset password',
      text: `<div style="color: red">Click here to reset password: ${config.HOST}/api/auth/reset-password/${resetPasswordToken}. This link will be expired in 5 minutes.</div>`,
    };
    await transporter.sendMail(mailOptions);

    const success = new Success();
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = req.params.token;
    const decoded = await verifyToken(
      resetPasswordToken,
      config.RESET_PASSWORD_SECRET_KEY
    );
    if (!decoded) {
      throw new Error({
        message: 'user.tokenIsExpired',
        statusCode: 400,
        error: 'token is expired',
      });
    }
    const user = await User.findOne({
      _id: decoded.data._id,
      status: 'active',
    });
    const hash = await bcrypt.hash(req.body.new_password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_new_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        message: 'user.passwordsNotMatch',
        statusCode: 400,
        error: 'password and confirm_password do not matched',
      });
    }
    user.password = hash;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tuananhtruong1950@gmail.com',
        pass: 'tuananhtruong1950',
      },
    });
    const mailOptions = {
      to: user.email,
      from: 'tuananhtruong1950@gmail.com',
      subject: 'Reset password',
      text: `<div>Reset password successfully.</div>`,
    };
    await transporter.sendMail(mailOptions);

    const success = new Success();
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
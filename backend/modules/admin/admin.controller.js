const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const User = require('../users/user.model');

exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ isAdmin: true });
    const success = new Success({ data: admins });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const admin = await User.findOne({ _id: req.params.id, isAdmin: true });
    if (!admin) {
      throw new Error({
        statusCode: 404,
        message: 'admin.notFound',
        messages: { admin: 'admin has been not registered' },
      });
    }

    const success = new Success({ data: admin });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.addAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.id, isAdmin: true });
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        messages: { user: 'user has been not registered' },
      });
    }

    user.isAdmin = true;
    user.role.push('admin');

    await User.findByIdAndUpdate(req.params.id, user);
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isAdmin: true });
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        messages: { user: 'user has been not registered' },
      });
    }

    user.isAdmin = false;
    user.role = user.role.filter(item => item !== 'admin');
    
    await User.findByIdAndUpdate(req.params.id, user);
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
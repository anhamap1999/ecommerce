const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const User = require('../users/user.model');

exports.getStaff = async (req, res, next) => {
  try {
    const staff = await User.find({ role: 'admin' });
    const success = new Success({ data: staff });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getStaffById = async (req, res, next) => {
  try {
    const staff = await User.findOne({ _id: req.params.id, role: 'staff' });
    if (!staff) {
      throw new Error({
        statusCode: 404,
        message: 'staff.notFound',
        messages: { staff: 'staff not found' },
      });
    }

    const success = new Success({ data: staff });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.addStaff = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.id, role: 'customer' });
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        messages: { user: 'user has been not registered' },
      });
    }

    user.role = 'staff';
    user.updated_at = Date.now();
    await User.findByIdAndUpdate(req.params.id, user);
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    const staff = await User.findOne({ _id: req.params.id, role: 'staff' });
    if (!staff) {
      throw new Error({
        statusCode: 404,
        message: 'staff.notFound',
        messages: { staff: 'staff not found' },
      });
    }

    user.role = 'customer';

    await User.findByIdAndUpdate(req.params.id, user);
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

const User = require('./user.model');
const { getToken } = require('../../utils/ultil');
const bcrypt = require('bcrypt');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');



exports.register = async (req, res, next) => {
  try {
    
    const existedUser = await User.findOne({
      email: req.body.email
    });
    
    if (existedUser) {
      throw new Error({
        statusCode: 400,
        message: 'user.emailExisted',
        messages: { user: 'email has been registered' },
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        statusCode: 400,
        message: 'user.passwordsNotMatch',
        messages: { auth: 'password and confirm_password do not matched' },
      });
    }
    const user = new User(req.body);
    user.role = 'customer';
    user.password = hash;
    const savedUser = await user.save();

    const success = new Success({ data: savedUser });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',        
        messages: { user: 'user not found' },
      });
    }
    
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      throw new Error({
        statusCode: 404,
        message: 'auth.passwordIsIncorrect',
        messages: { auth: 'password is incorrect' },
      })
    }

    const hash = await bcrypt.hash(req.body.new_password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_new_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        message: 'user.passwordsNotMatch',
        statusCode: 400,
        messages: { auth: 'password and confirm_password do not matched' },
      });
    }
    user.password = hash;
    req.user.password = hash;
    await User.findByIdAndUpdate(req.user._id, user);

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({
      _id: req.user._id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',        
        messages: { user: 'user not found' },
      });
    }
    
    user = { ...user._doc, ...req.body };
    req.user = { ...req.user, ...user };
    await User.findByIdAndUpdate(req.user._id, user);

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      status: 'active',
    }).populate({ path: 'like_products' });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',        
        messages: { user: 'user not found' },
      });
    }
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };
    const success = new Success({});
    await User.paginate(query, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const users = await User.populate(result.docs, [{ path: 'like_products' }]);
          success
            .addField('data', users)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.updateStatusUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',        
        messages: { user: 'user not found' },
      });
    }
    user.status = req.body.status;
    await User.findByIdAndUpdate(req.params.id, user);
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

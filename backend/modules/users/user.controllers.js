const User = require('./user.model');
const { getToken } = require('../../utils/ultil');
const bcrypt = require('bcrypt');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');

exports.getUser = async (req , res )=> {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      
      if (signinUser) {
        res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser),
        });
      } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
      }
};
exports.userRegister = async (req , res )=> {
  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  const newUser = await user.save();  
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid user data.' });
    }
};


exports.getAdmin = async( req, res) =>{
    try {
        const user = new User({
            name : 'liem',
            email : 'liemdonduong@gmail.com',
            password: 'liem123',
            isAdmin : true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message});
    }
};
exports.demo = async( req, res) =>{
    res.send("hello");
};

exports.register = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({
      email: req.body.email,
      status: 'active',
    });
    if (existedUser) {
      throw new Error({
        statusCode: 400,
        message: 'user.emailExisted',
        error: 'email has been registered',
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
        error: 'password and confirm_password do not matched',
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
        error: 'user not found',
      });
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
        error: 'password and confirm_password do not matched',
      });
    }
    user.password = hash;
    req.user.password = hash;
    await User.findByIdAndUpdate(req.user._id, user);

    const success = new Success({});
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({
      id: req.user._id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',        
        error: 'user not found',
      });
    }
    
    user = { ...user, ...req.body };
    req.user = { ...req.user, ...user };
    await User.findByIdAndUpdate(req.user._id, user);

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
}
const Cart = require('./cart.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const User = require('../users/user.model');

exports.getCarts = async (req, res, next) => {
  try {
    const { select, sort } = req.query;

    const success = new Success({});
    await Cart.paginate({ ...query, status: 'approved' }, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
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
};

exports.getCartsByAdmin = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };
    const success = new Success({});
    await Cart.paginate(query, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
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
};

exports.getCartById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const cart = await Cart.findOne({
      _id: id,
      status: 'approved',
    }).select(select);

    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.adminGetCartById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const cart = await Cart.findById(id).select(select);

    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const cart = new Cart(req.body);
    cart.user_id = req.user._id;
    cart.status = 'pending';
    cart.pure_name = utils.removeAccents(cart.name);
    const result = await cart.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    cart = { ...cart._doc, ...req.body };
    cart.pure_name = utils.removeAccents(cart.name);
    await Cart.findByIdAndUpdate(req.params.id, cart);
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateStatusCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    cart.status = req.body.status;
    await Cart.findByIdAndUpdate(req.params.id, cart);
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.likeCart = async (req, res, next) => {
  try {
    const { id, state } = req.body;
    const cart = await Cart.findById(id);
    const user = await User.findById(req.user._id);
    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    if (state === 'like') {
      cart.likes_count++;
      user.like_cart.push(id);
    } else if (state === 'unlike' && cart.likes_count > 0) {
      cart.likes_count--;
      user.like_cart = user.like_cart.filter((item) => item !== id);
    }
    await Cart.findByIdAndUpdate(id, cart);
    await User.findByIdAndUpdate(id, user);
    req.user = user;
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

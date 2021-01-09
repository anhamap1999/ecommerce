const Cart = require('./cart.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const Product = require('../products/product.model');

exports.getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find({ created_by: req.user._id }).sort('-created_at');
    const result = await Cart.populate(carts, [{ path: 'product_id' }]);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('product_id');

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

exports.addCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.product_id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        messages: { product: 'product not found' },
      });
    }
    const cart = new Cart(req.body);
    cart.created_by = req.user._id;
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
    cart.updated_at = Date.now();
    await Cart.findByIdAndUpdate(req.params.id, cart);
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      throw new Error({
        statusCode: 404,
        message: 'cart.notFound',
        messages: { cart: 'cart not found' },
      });
    }
    await Cart.findByIdAndRemove(req.params.id);
    const success = new Success({ data: cart });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

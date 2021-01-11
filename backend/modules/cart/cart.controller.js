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
    const { product_id, size, quantity } = req.body;
    const product = await Product.findById(product_id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        messages: { product: 'product not found' },
      });
    }
    const success = new Success({});
    const existed_cart = await Cart.findOne({ product_id, size }).populate('product_id');
    if (existed_cart) {
      existed_cart.quantity += quantity;
      existed_cart.updated_at = Date.now();
      await Cart.findByIdAndUpdate(existed_cart._id, existed_cart);
      success.data = existed_cart;
    } else {
      const cart = new Cart(req.body);
      cart.created_by = req.user._id;
      const result = await cart.save();
      const created_product = await Cart.findById(result._id).populate('product_id');
      success.data = created_product;
    }
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    let cart = await Cart.findById(req.params.id).populate('product_id');

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

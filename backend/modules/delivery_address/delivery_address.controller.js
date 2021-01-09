const DeliveryAddress = require('./delivery_address.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const { Ward, Province, District } = require('../address/address.model');

exports.getAddresses = async (req, res, next) => {
  try {
    const addresses = await DeliveryAddress.find({ status: 'active', created_by: req.user._id });
    const success = new Success({ data: addresses });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findOne({
      _id: req.params.id,
      status: 'approved',
    });

    if (!address) {
      throw new Error({
        statusCode: 404,
        message: 'address.notFound',
        messages: { address: 'address not found' },
      });
    }
    const success = new Success({ data: address });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
///issue in province...
exports.createAddress = async (req, res, next) => {
  try {
    const address = new DeliveryAddress(req.body);

    address.created_by = req.user._id;
    const addressPromises = [
      Province.findOne({ number: address.province_number }),
      District.findOne({ number: address.district_number }),
      Ward.findOne({ number: address.ward_number }),
    ];
    const [province, district, ward] = await Promise.all(addressPromises);
    address.normalizedAddress =
      address.text +
      ', ' +
      ward.name +
      ', ' +
      district.name +
      ', ' +
      province.name;

    const result = await address.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    let address = await DeliveryAddress.findOne({
      _id: req.params.id,
      status: 'active',
    });

    if (!address) {
      throw new Error({
        statusCode: 404,
        message: 'address.notFound',
        messages: { address: 'address not found' },
      });
    }
    if (address.created_by !== req.user._id) {
      throw new Error({
        statusCode: 404,
        message: 'address.doNotHavePermission',
        messages: { address: 'do not have permission' },
      });
    }
    address = { ...address._doc, ...req.body };
    address.updated_at = Date.now();
    const addressPromises = [
      Province.findOne({ number: address.province_number }),
      District.findOne({ number: address.district_number }),
      Ward.findOne({ number: address.ward_number }),
    ];
    const [province, district, ward] = await Promise.all(addressPromises);
    address.normalizedAddress =
      address.text +
      ', ' +
      ward.name +
      ', ' +
      district.name +
      ', ' +
      province.name;

    await DeliveryAddress.findByIdAndUpdate(req.params.id, address);
    const success = new Success({ data: address });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.setDefaultAddress = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findOne({
      _id: req.params.id,
      status: 'active',
      created_by: req.user._id
    });
    const default_address = await DeliveryAddress.findOne({
      status: 'active',
      is_default: true,
      created_by: req.user._id
    });
    if (!address) {
      throw new Error({
        statusCode: 404,
        message: 'address.notFound',
        messages: { address: 'address not found' },
      });
    }
    address.is_default = true;
    address.updated_at = Date.now();
    await DeliveryAddress.findByIdAndUpdate(req.params.id, address);

    default_address.is_default = false;
    default_address.updated_at = Date.now();
    await DeliveryAddress.findByIdAndUpdate(
      default_address._id,
      default_address
    );
    const success = new Success({ data: address });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findById(req.params.id);
    if (!address) {
      throw new Error({
        statusCode: 404,
        message: 'address.notFound',
        messages: { address: 'address not found' },
      });
    }
    if (address.created_by !== req.user._id) {
      throw new Error({
        statusCode: 404,
        message: 'address.doNotHavePermission',
        messages: { address: 'do not have permission' },
      });
    }
    address.status = 'disabled';
    address.updated_at = Date.now();
    await DeliveryAddress.findByIdAndUpdate(req.params.id, address);
    const success = new Success({ data: address });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

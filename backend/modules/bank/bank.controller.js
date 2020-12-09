const Bank = require('./bank.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getBanks = async (req, res, next) => {
  try {
    const banks = Bank.find({ created_by: req.user._id, status: 'active' });
    const success = new Success({ data: banks });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getBankById = async (req, res, next) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      throw new Error({
        statusCode: 404,
        message: 'bank.notFound',
        messages: { bank: 'bank not found' },
      });
    }
    const success = new Success({ data: bank });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createBank = async (req, res, next) => {
  try {
    const bank = new Bank(req.body);
    bank.created_by = req.user._id;
    const result = await bank.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

// exports.updateBank = async (req, res, next) => {
//   try {
//     let bank = await Bank.findById(req.params.id);

//     if (!bank) {
//       throw new Error({
//         statusCode: 404,
//         message: 'bank.notFound',
//         messages: { bank: 'bank not found' },
//       });
//     }
//     bank = { ...bank._doc, ...req.body };
//     await Product.findByIdAndUpdate(req.params.id, bank);
//     const success = new Success({ data: bank });
//     res.status(200).send(success);
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteBank = async (req, res, next) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      throw new Error({
        statusCode: 404,
        message: 'bank.notFound',
        messages: { bank: 'bank not found' },
      });
    }
    bank.status = 'disabled';
    await Product.findByIdAndUpdate(id, bank);
    const success = new Success({ data: bank });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

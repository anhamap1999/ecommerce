const BankAccount = require('./bank_account.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const { Bank, Branch } = require('../banks/banks.model');

exports.getBankAccounts = async (req, res, next) => {
  try {
    const banks = await BankAccount.find({ created_by: req.user._id, status: 'active' });
    const result = await BankAccount.populate(banks, [{ path: 'bank' }, { path: 'branch' }]);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getBankAccountById = async (req, res, next) => {
  try {
    const bank = await BankAccount.findById(req.params.id);

    if (!bank) {
      throw new Error({
        statusCode: 404,
        message: 'bankAccount.notFound',
        messages: { bankAccount: 'bank account not found' },
      });
    }

    const result = await BankAccount.populate(bank, [{ path: 'bank' }, { path: 'branch' }]);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createBankAccount = async (req, res, next) => {
  try {
    const bankAccount = new BankAccount(req.body);

    const bank = await Bank.findOne({ number: bankAccount.bank_number });
    const branch = await Branch.findOne({ number: bankAccount.branch_number });
    bankAccount.created_by = req.user._id;
    bankAccount.bank = bank._id;
    bankAccount.branch = branch._id;

    const result = await bankAccount.save();
    const new_bank = await BankAccount.findById(result._id).populate([{ path: 'bank' }, { path: 'branch' }]);

    const success = new Success({ data: new_bank });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

// exports.updateBankAccount = async (req, res, next) => {
//   try {
//     let bank = await BankAccount.findById(req.params.id);

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

exports.deleteBankAccount = async (req, res, next) => {
  try {
    const bank = await BankAccount.findById(req.params.id);

    if (!bank) {
      throw new Error({
        statusCode: 404,
        message: 'bankAccount.notFound',
        messages: { bankAccount: 'bank account not found' },
      });
    }
    bank.status = 'disabled';
    await BankAccount.findByIdAndUpdate(id, bank);
    const success = new Success({ data: bank });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

const { Bank, Branch } = require('./banks.model');
const { Province } = require('../address/address.model');
const { Success, Error } = require('../../utils');
const utils = require('../../commons/utils');
// const banksData = require('../../bank-data.json');

exports.getBanks = async (req, res, next) => {
  try {
    const { sort } = req.query;

    const banks = await Bank.find({}).sort(sort ? sort : 'number');

    const success = new Success({ data: banks });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getBranches = async (req, res, next) => {
  try {
    const { sort, province_number, bank_number } = req.query;

    const province = await Province.findOne({ number: province_number });
    if (!province) {
      throw new Error({
        statusCode: 404,
        message: 'province.notFound',
        messages: { province: 'province not found' },
      });
    }

    const bank = await Bank.findOne({ number: bank_number });
    if (!bank) {
      throw new Error({
        statusCode: 404,
        message: 'bank.notFound',
        messages: { bank: 'bank not found' },
      });
    }

    const branches = await Branch.find({ province_number, bank_number }).sort(
      sort ? sort : 'number'
    );
    // .populate(populate.includes('province_id') ? 'province_id' : '')
    // .populate(populate.includes('bank_id') ? 'bank_id' : '');

    const success = new Success({ data: branches });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

// exports.postBanks = async (req, res, next) => {
//   try {
//     const bankPromises = [];
//     const branchPromises = [];
//     const banks = [
//       'NH Dau tu va Phat trien VN (BIDV)',
//       'NH NNo&PT Nong thon VN-AGribank',
//       'NHTMCP A Chau (ACB)',
//       'NHTMCP An Binh (ABBank)',
//       'NHTMCP Dong A (Dong A bank)',
//       'NHTMCP Ky thuong VN (Techcombank)',
//       'NHTMCP Phuong Dong (OCB)',
//       'NHTMCP Quoc Te (VIB)',
//       'NHTMCP Sai Gon (SCB)',
//       'NHTMCP Sai gon Thuong Tin (Sacombank)',
//       'NHTMCP SG Cong Thuong (SaigonBank)',
//       'NHTMCP VN Thinh Vuong(VP Bank)',
//     ];
//     const provinces = await Province.find({});
//     banksData.forEach((bankType) => {
//       const { bankList } = bankType;
//       bankList.forEach((bank) => {
//         const { MaNganHang, TenNH, province } = bank;
//         if (!banks.includes(TenNH)) {
//           return;
//         }
//         bankPromises.push(
//           Bank.create({
//             number: MaNganHang,
//             name: TenNH,
//           })
//         );
//         province.forEach((p) => {
//           const { TenTinhThanh, branch } = p;
//           const provinceIndex = provinces.findIndex(
//             (i) =>
//               utils.removeAccents(i.name) ===
//                 utils.removeAccents(TenTinhThanh) ||
//               (i.name === 'Hà Nội' && TenTinhThanh === 'Ha Noi')
//           );
//           const province_number = provinces[provinceIndex]
//             ? provinces[provinceIndex].number
//             : 0;
//           branch.forEach((b) => {
//             const { MaChiNhanh, TenChiNhanh } = b;
//             branchPromises.push(
//               Branch.create({
//                 number: MaChiNhanh,
//                 name: TenChiNhanh,
//                 province_number,
//                 bank_number: MaNganHang,
//               })
//             );
//           });
//         });
//       });
//     });

//     await Promise.all([...bankPromises, ...branchPromises]);

//     const success = new Success({});
//     res.status(200).send(success);
//   } catch (error) {
//     next(error);
//   }
// };

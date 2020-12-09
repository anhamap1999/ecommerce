const { Province, District, Ward } = require('./address.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const localData = require('../../local.json');

exports.getProvinces = async (req, res, next) => {
  try {
    const { sort } = req.query;

    const provinces = await Province.find({}).sort(sort ? sort : 'number');

    const success = new Success({ data: provinces });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getDistricts = async (req, res, next) => {
  try {
    const { sort, province_number } = req.query;

    const province = await Province.findOne({ number: province_number });
    if (!province) {
      throw new Error({
        statusCode: 404,
        message: 'province.notFound',
        messages: { province: 'province not found' },
      });
    }

    const districts = await District.find({ province_number }).sort(
      sort ? sort : 'number'
    );

    const success = new Success({ data: districts });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getWards = async (req, res, next) => {
  try {
    const { sort, province_number, district_number } = req.query;

    const province = await Province.findOne({ number: province_number });
    if (!province) {
      throw new Error({
        statusCode: 404,
        message: 'province.notFound',
        messages: { province: 'province not found' },
      });
    }

    const district = await District.findOne({ number: district_number });
    if (!district) {
      throw new Error({
        statusCode: 404,
        message: 'district.notFound',
        messages: { district: 'district not found' },
      });
    }

    const wards = await Ward.find({ province_number, district_number }).sort(
      sort ? sort : 'number'
    );

    const success = new Success({ data: wards });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.postAddress = async (req, res, next) => {
  try {
    const provincePromises = [];
    const districtPromises = [];
    const wardPromises = [];
    localData.forEach((province) => {
      const { id: number, name, code, districts } = province;
      provincePromises.push(
        Province.create({
          number,
          name,
          code,
        })
      );
      districts.forEach((district) => {
        const { id: district_number, name, wards } = district;
        districtPromises.push(
          District.create({
            number: district_number,
            name,
            province_number: number
          })
        );
        wards.forEach((ward) => {
          const { id: ward_number, name, prefix } = ward;
          wardPromises.push(
            Ward.create({
              number: ward_number,
              name: prefix + ' ' + name,
              province_number: number,
              district_number
            })
          );
        });
      });
    });

    Promise.all([...wardPromises]);

    const success = new Success({});
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

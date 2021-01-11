import vi from '../assets/languages/vi.json';
import _ from 'lodash';
const keyDefined = {};

function getMessage(key, param = []) {
  let string = _.get(vi, key) || 'lỗi không xác định';
  if (string && param.length > 0) {
    for (let i = 0; i < param.length; i++) {
      try {
        const regexString = `\\{${i}\\}`;
        const regex = new RegExp(regexString, 'g');
        string = string.replace(regex, param[i]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return string;
}

function getMessageError(errors) {
  if (!errors || _.isEmpty(errors)) {
    return 'server error';
  }

  for (let key in errors) {
    const messageError = getMessage(errors[key]) || 'lỗi không xác định';

    return (keyDefined[key] ? keyDefined[key] + ': ' : '') + messageError;
  }
}

function formatQuery(query) {
  let queryString = '?';
  for (let key in query) {
    if (
      !query[key] &&
      typeof query[key] !== 'boolean' &&
      typeof query[key] !== 'number'
    ) {
      delete query[key];
    } else if (_.isArray(query[key])) {
      query[key].forEach((item) => (queryString += `${key}[]=${item}&`));
    } else {
      queryString += `${key}=${query[key]}&`;
    }
  }
  return queryString;
}
function formatData(data) {
  for (const key in data) {
    if ((!data[key] && data[key] !== 0) || data[key] === '') delete data[key];
  }
  return data;
}

function vndFormat(x) {
  if (typeof x !== 'number') return;
  return x.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
export default {
  getMessage,
  getMessageError,
  formatQuery,
  formatData,
  vndFormat,
};

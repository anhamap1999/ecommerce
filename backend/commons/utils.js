const Joi = require('joi');
const { Error } = require('../utils/Error');

const directory = {
  á: 'a',
  à: 'a',
  ả: 'a',
  ạ: 'a',
  ã: 'a',
  ă: 'a',
  ắ: 'a',
  ằ: 'a',
  ẳ: 'a',
  ặ: 'a',
  ẵ: 'a',
  â: 'a',
  ấ: 'a',
  ầ: 'a',
  ẩ: 'a',
  ậ: 'a',
  ẫ: 'a',
  é: 'e',
  è: 'e',
  ẻ: 'e',
  ẹ: 'e',
  ẽ: 'e',
  ê: 'e',
  ế: 'e',
  ề: 'e',
  ể: 'e',
  ệ: 'e',
  ễ: 'e',
  ú: 'u',
  ù: 'u',
  ủ: 'u',
  ụ: 'u',
  ũ: 'u',
  ư: 'u',
  ứ: 'u',
  ừ: 'u',
  ử: 'u',
  ự: 'u',
  ữ: 'u',
  ó: 'o',
  ò: 'o',
  ỏ: 'o',
  ọ: 'o',
  õ: 'o',
  ô: 'o',
  ố: 'o',
  ồ: 'o',
  ổ: 'o',
  ộ: 'o',
  ỗ: 'o',
  ơ: 'o',
  ớ: 'o',
  ờ: 'o',
  ở: 'o',
  ợ: 'o',
  ỡ: 'o',
  í: 'i',
  ì: 'i',
  ỉ: 'i',
  ị: 'i',
  ĩ: 'i',
  đ: 'd',
  ',': ' ',
  '.': ' ',
  '(': ' ',
  ')': ' ',
  '-': ' ',
  _: ' ',
  '/': ' ',
  '&': ' ',
  '[': ' ',
  ']': ' ',
  '{': ' ',
  '}': ' ',
  '!': ' ',
  '@': ' ',
  '#': ' ',
  $: ' ',
  '^': ' ',
  '*': ' ',
  '+': ' ',
  '=': ' ',
  '|': ' ',
  '<': ' ',
  '>': ' ',
  ';': ' ',
  ':': ' ',
  '?': ' ',
};

exports.validate = async (data, schema) => {
  try {
    const result = await schema.validateAsync(data, { abortEarly: false });
    return Promise.resolve(result);
  } catch (error) {
    if (Joi.isError(error)) {
      const messages = {};
      error.details.map((err) => (messages[err.context.key] = err.message));
      const message = error.details[0].type;
      const validateError = new Error({ statusCode: 400, message, messages });
      return Promise.reject(validateError);
    }
    return Promise.reject(error);
  }
};

exports.removeAccents = (text) => {
  const lowercaseText = text.toLowerCase();
  let newText = '';
  for (let i = 0; i < lowercaseText.length; i++) {
    if (directory[lowercaseText[i]]) {
      newText += directory[lowercaseText[i]];
    } else {
      newText += lowercaseText[i];
    }
  }
  return newText;
};

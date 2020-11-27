const Joi = require('joi');
const { Error } = require('../utils/Error');

const directory = {
  'á': 'a',
  'à': 'a',
  'ả': 'a',
  'ạ': 'a',
  'ắ': 'a',
  'ằ': 'a',
  'ẳ': 'a',
  'ặ': 'a',
  'ấ': 'a',
  'ầ': 'a',
  'ẩ': 'a',
  'ậ': 'a',
  'é': 'e',
  'è': 'e',
  'ẻ': 'e',
  'ẹ': 'e',
  'ế': 'e',
  'ề': 'e',
  'ể': 'e',
  'ệ': 'e',
  'ú': 'u',
  'ù': 'u',
  'ủ': 'u',
  'ụ': 'u',
  'ứ': 'u',
  'ừ': 'u',
  'ử': 'u',
  'ự': 'u',
  'ó': 'o',
  'ò': 'o',
  'ỏ': 'o',
  'ọ': 'o',
  'ố': 'o',
  'ồ': 'o',
  'ổ': 'o',
  'ộ': 'o',
  'ớ': 'o',
  'ờ': 'o',
  'ở': 'o',
  'ợ': 'o',
  'í': 'i',
  'ì': 'i',
  'ỉ': 'i',
  'ị': 'i',
  ',': ' ',
  '.': ' ',
  '(': ' ',
  ')': ' ',
  '-': ' ',
  '_': ' ',
  '/': ' ',
  '&': ' ',
  '[': ' ',
  ']': ' ',
  '{': ' ',
  '}': ' ',
  '!': ' ',
  '@': ' ',
  '#': ' ',
  '$': ' ',
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
}

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

exports.removeAccents = text => {
  const lowercaseText = text.toLowerCase();
  let newText = '';
  for(let i = 0; i < lowercaseText.length; i++) {
    if (directory[lowercaseText[i]]) {
      newText += directory[lowercaseText[i]];
    } else {
      newText += lowercaseText[i];
    }
  }
  return newText;
}
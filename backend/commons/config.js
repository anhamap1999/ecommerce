require('dotenv').config();
const {
  DB_CONNECT,
  SECRET_KEY,
  TOKEN_LIFE,
  RESET_PASSWORD_SECRET_KEY,
  RESET_PASSWORD_TOKEN_LIFE,
  HOST,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
} = process.env;

module.exports = {
  MONGODB_URL: DB_CONNECT,
  // || 'mongodb://localhost/thanhliem',
  JWT_SECRET_KEY: SECRET_KEY,
  // || 'somethingsecret',
  JWT_TOKEN_LIFE: TOKEN_LIFE,
  RESET_PASSWORD_SECRET_KEY,
  RESET_PASSWORD_TOKEN_LIFE,
  HOST,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
};

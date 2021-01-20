class Error {
  constructor({ statusCode, message, error, errors, messages }) {
    this.statusCode = statusCode;
    this.error = error || 4000;
    this.message = message;
    this.errors = errors || {};
    this.messages = messages;
    this.level = 'error';
    this.timestamp = new Date().toLocaleString();
  }

  addField(key, value) {
    this[key] = value;
    return this;
  }

  getCode() {
    return this instanceof Error ? this.statusCode : 500;
  }
}

module.exports = { Error };

class Success {
  constructor({ message, data }) {
    this.statusCode = 200;
    this.data = data;
    this.message = message;
  }

  addField(key, value) {
    this[key] = value;
    return this;
  }
}

module.exports = { Success };

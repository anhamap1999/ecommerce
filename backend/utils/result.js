const { model } = require("../modules/products/product.model");

class Result {
    constructor(message, data, totalPage) {
        this.data = data;
        this.message = message;
        this.totalPage = totalPage && totalPage >= 1 ? totalPage : 1
    }
}

module.exports = Result;
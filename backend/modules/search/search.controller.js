const utils = require('../../commons/utils');
const { Success, Error } = require('../../utils');
const Product = require('../products/product.model');

exports.search = async (req, res, next) => {
  try {
    const { select, sort, page, limit, name } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    let total_page,
      total = 0;

    let data = [];
    if (typeof name === 'string' && name[0] !== '"') {
      const absoluteText = '"' + name + '"';

      await Product.paginate(
        {
          $text: { $search: absoluteText },
          status: 'approved',
        },
        options
      )
        .then((result) => {
          if (result.totalDocs && result.totalDocs > 0) {
            total_page = result.totalPages;
            total = result.totalDocs;
            data = data.concat(result.docs);
          }
        })
        .catch((error) => {
          next(error);
        });
    }

    if (total < options.limit) {
      const products = await Product.find({
        $text: { $search: name },
        status: 'approved',
      });
      const uniqueProducts = products.filter(
        (item) => data.findIndex((i) => i._id === item._id) < 0
      );

      if (uniqueProducts.length) {
        const scores = [];
        const words = name.toLowerCase().split(' ');

        uniqueProducts.forEach((item) => {
          scores[item._id] = 0;
          const itemName = item.name.toLowerCase();
          for (let i = 0; i < words.length; i++) {
            if (i === 0) {
              if (itemName.includes(words[i])) {
                scores[item._id] += 0.5;
              } else if (
                utils
                  .removeAccents(itemName)
                  .includes(utils.removeAccents(words[i]))
              ) {
                scores[item._id] += 0.2;
              }
            } else {
              if (itemName.includes(words[i])) {
                scores[item._id] += 0.5;
                if (
                  itemName.indexOf(words[i]) > itemName.indexOf(words[i - 1])
                ) {
                  scores[item._id] += 0.3;
                }
              } else if (
                utils
                  .removeAccents(itemName)
                  .includes(utils.removeAccents(words[i]))
              ) {
                scores[item._id] += 0.2;
                if (
                  utils
                    .removeAccents(itemName)
                    .indexOf(utils.removeAccents(words[i])) >
                  utils
                    .removeAccents(itemName)
                    .indexOf(utils.removeAccents(words[i - 1]))
                ) {
                  scores[item._id] += 0.1;
                }
              }
            }
          }
        });

        // if (scores.length) {
        scores.sort((a, b) => b - a);
        const length =
          options.limit - total > uniqueProducts.length
            ? uniqueProducts.length
            : options.limit - total;
        const searchProducts = uniqueProducts.filter((item) =>
          scores.slice(0, length - 1).findIndex((s) => s._id === item._id)
        );

        data = data.concat(searchProducts);
        total += uniqueProducts.length;
        total_page = Math.ceil(total / options.limit);
        //   }
      }
    }
    const success = new Success({ data })
      .addField('total_page', total_page)
      .addField('total', total);
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.adminSearch = async (req, res, next) => {
  try {
    const { select, sort, page, limit, name } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    let total_page,
      total = 0;

    let data = [];
    if (typeof name === 'string' && name[0] !== '"') {
      const absoluteText = '"' + name + '"';

      await Product.paginate(
        {
          $text: { $search: absoluteText },
        },
        options
      )
        .then((result) => {
          if (result.totalDocs && result.totalDocs > 0) {
            total_page = result.totalPages;
            total = result.totalDocs;
            data = data.concat(result.docs);
          }
        })
        .catch((error) => {
          next(error);
        });
    }

    if (total < options.limit) {
      const products = await Product.find({
        $text: { $search: name },
      });
      const uniqueProducts = products.filter(
        (item) => data.findIndex((i) => i._id === item._id) < 0
      );

      if (uniqueProducts.length) {
        const scores = [];
        const words = name.toLowerCase().split(' ');

        uniqueProducts.forEach((item) => {
          scores[item._id] = 0;
          const itemName = item.name.toLowerCase();
          for (let i = 0; i < words.length; i++) {
            if (i === 0) {
              if (itemName.includes(words[i])) {
                scores[item._id] += 0.5;
              } else if (
                utils
                  .removeAccents(itemName)
                  .includes(utils.removeAccents(words[i]))
              ) {
                scores[item._id] += 0.2;
              }
            } else {
              if (itemName.includes(words[i])) {
                scores[item._id] += 0.5;
                if (
                  itemName.indexOf(words[i]) > itemName.indexOf(words[i - 1])
                ) {
                  scores[item._id] += 0.3;
                }
              } else if (
                utils
                  .removeAccents(itemName)
                  .includes(utils.removeAccents(words[i]))
              ) {
                scores[item._id] += 0.2;
                if (
                  utils
                    .removeAccents(itemName)
                    .indexOf(utils.removeAccents(words[i])) >
                  utils
                    .removeAccents(itemName)
                    .indexOf(utils.removeAccents(words[i - 1]))
                ) {
                  scores[item._id] += 0.1;
                }
              }
            }
          }
        });

        // if (scores.length) {
        scores.sort((a, b) => b - a);
        const length =
          options.limit - total > uniqueProducts.length
            ? uniqueProducts.length
            : options.limit - total;
        const searchProducts = uniqueProducts.filter((item) =>
          scores.slice(0, length - 1).findIndex((s) => s._id === item._id)
        );

        data = data.concat(searchProducts);
        total += uniqueProducts.length;
        total_page = Math.ceil(total / options.limit);
        //   }
      }
    }
    const success = new Success({ data })
      .addField('total_page', total_page)
      .addField('total', total);
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

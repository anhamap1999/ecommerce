const Category = require('./category.model');
const utils = require('../../commons/utils');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');

exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ status: 'active' });

    if (categories.length > 0) {
      res.status(200).send('successful');
    } else {
      res.status(400).send('msg : error');
    }
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      status: 'active',
    });

    if (category) {
      res.status(200).send('successful');
    }
  } catch (error) {
    res.status(400).send('msg : error');
    next(error);
  }
};

exports.addCategory = async (req, res) => {
  try {
 
    const category = new Category(req.body);
   
    const savedCategory = await category.save();
    if (savedCategory) {
      res.status(200).send('successful');
    }
  } catch (error) {
    res.status(400).send('failed');
  }
};

// exports.updateCategory = async (req, res, next) => {
//   try {
//     await Category.findOneAndUpdate(
//       { _id: req.params.id, status: 'active' },
//       req.body
//     );

//     res.status(200).send('successful');
//   } catch (error) {
//     res.status(400).send('msg : error');
//     next(error);
//   }
// };

// exports.deleteCategory = async (req, res, next) => {
//   try {
//     let category = await Category.findOne({
//       _id: req.params.id,
//       status: 'active',
//     });
//     category.status = 'disabled';
//     await category.save();

//     res.status(200).send('successful');
//   } catch (error) {
//     res.status(400).send('msg : error');
//     next(error);
//   }
// };

exports.createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    category.pure_name = utils.removeAccents(category.name);
    const { parent_id } = req.body;
    if (parent_id) {
      const parent_category = await Category.findById(parent_id);

      if (!parent_category) {
        throw new Error({
          statusCode: 404,
          message: 'parent_category.notFound',
          messages: { category: 'parent_category not found' },
        });
      }
      if (parent_category.status !== 'active') {
        throw new Error({
          statusCode: 400,
          message: 'parent_category.isNotActive',
          messages: { category: 'parent_category is not active' },
        });
      }
      if (parent_category.type > category.type) {
        throw new Error({
          statusCode: 400,
          message: 'category.typeIsNotValid',
          messages: { category: 'category type is less than parent category type' },
        });
      }
      category.parent_id = parent_id;
    }
    category.created_by = req.user._id;
    const result = await category.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      throw new Error({
        statusCode: 404,
        message: 'category.notFound',
        messages: { category: 'category not found' },
      });
    }
    category = { ...category._doc, ...req.body };
    category.pure_name = utils.removeAccents(category.name);
    const { parent_id } = category;
    if (parent_id) {
      const parent_category = await Category.findById(parent_id);
      if (!parent_category) {
        throw new Error({
          statusCode: 404,
          message: 'parent_category.notFound',
          messages: { category: 'parent_category not found' },
        });
      }
      if (parent_category.status !== 'active') {
        throw new Error({
          statusCode: 400,
          message: 'parent_category.isNotActive',
          messages: { category: 'parent_category is not active' },
        });
      }
      if (parent_category.type > category.type) {
        throw new Error({
          statusCode: 400,
          message: 'category.typeIsNotValid',
          messages: { category: 'category type is less than parent category type' },
        });
      }
    }
    category.updated_by = req.user._id;
    category.updated_at = Date.now();
    await Category.findByIdAndUpdate(req.params.id, category);
    const success = new Success({ data: category });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateStatusCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new Error({
        statusCode: 404,
        message: 'category.notFound',
        messages: { category: 'category not found' },
      });
    }
    category.status = req.body.status;
    category.updated_by = req.user._id;
    category.updated_at = Date.now();
    await Category.findByIdAndUpdate(req.params.id, category);
    const success = new Success({ data: category });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new Error({
        statusCode: 404,
        message: 'category.notFound',
        messages: { category: 'category not found' },
      });
    }
    // if (category.type > 1) {
      const categories = await Category.find({
        status: 'active',
        parent_id: category._id,
      });
      if (categories.length > 0) {
        throw new Error({
          statusCode: 404,
          message: 'category.canNotDelete',
          messages: { category: 'category is parent of other categories' },
        });
      }
    // }
    category.status = 'disabled';
    category.updated_by = req.user._id;
    category.updated_at = Date.now();
    await Category.findByIdAndUpdate(req.params.id, category);
    const success = new Success({ data: category });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
      status: 'active',
    }).select(select);

    if (!category) {
      throw new Error({
        statusCode: 404,
        message: 'category.notFound',
        messages: { category: 'category not found' },
      });
    }
    // if (category.parent_id) {
    //   const parent_category = await Category.findById(
    //     category.parent_id
    //   ).select('name status');
    //   if (!parent_category) {
    //     throw new Error({
    //       statusCode: 404,
    //       message: 'parent_category.notFound',
    //       messages: { category: 'parent_category not found' },
    //     });
    //   }
    //   category.parent_id = parent_category;
    // }
    const success = new Success({ data: category });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.adminGetCategoryById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const category = await Category.findById(id).select(select);

    if (!category) {
      throw new Error({
        statusCode: 404,
        message: 'category.notFound',
        messages: { category: 'category not found' },
      });
    }
    if (category.parent_id) {
      const parent_category = await Category.findById(
        category.parent_id
      ).select('name status');
      if (!parent_category) {
        throw new Error({
          statusCode: 404,
          message: 'parent_category.notFound',
          messages: { category: 'parent_category not found' },
        });
      }
      category.parent_id = parent_category;
    }
    const success = new Success({ data: category });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

//WORKING
exports.getCategories = async (req, res, next) => {
  try {
    const { select, sort } = req.query;

    const categories = await Category.find({ status: 'active' })
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const result = await Category.populate(categories, [{ path: 'parent_id' }]);
    // for (const [index, item] of categories.entries()) {
    
    // }
    // for (const [index, item] of categories.entries()) {
    //   if (item.parent_id) {
    //     const parent_category = await Category.findById(item.parent_id).select(
    //       'name status'
    //     );
    //     if (!parent_category) {
    //       throw new Error({
    //         statusCode: 404,
    //         message: 'parent_category.notFound',
    //         messages: { category: 'parent_category not found' },
    //       });
    //     }
    //     categories[index].parent_id = parent_category;
    //   }
    // }
    
    // console.log('CATEGORY', categories)
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getCategoriesByAdmin = async (req, res, next) => {
  try {
    const { select, sort } = req.query;

    const categories = await Category.find()
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const result = await Category.populate(categories, [{ path: 'parent_id' }]);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

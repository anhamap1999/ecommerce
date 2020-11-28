import Category from './category.model';


exports.listCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ status: 'active' });

        if (categories.length > 0) {
           
            res.status(200).send("successful");
        } else {
            res.status(400).send("msg : error");
        }
    } catch (error) {
        next(error);
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, status: 'active' });

        if(category)
        {
            res.status(200).send("successful");
        }
    } catch (error) {
        res.status(400).send("msg : error");
        next(error);
    }
};

exports.addCategory = async (req, res) => {
    try {
        console.log("co ");
        const category = new Category(req.body);
        console.log("co zo day",category);
        const savedCategory = await category.save();
        if(savedCategory )
        {
            res.status(200).send("successful");
        }
    } catch (error) {
        res.status(400).send("failed");
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        await Category.findOneAndUpdate({ _id: req.params.id, status: 'active' }, req.body);

        res.status(200).send("successful");
    } catch (error) {
        res.status(400).send("msg : error");
        next(error);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        let category = await Category.findOne({ _id: req.params.id, status: 'active' });
        category.status = 'disabled';
        await category.save();

        
        res.status(200).send("successful");
    } catch (error) {
        res.status(400).send("msg : error");
        next(error);
    }
};
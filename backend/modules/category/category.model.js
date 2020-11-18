import mongoose from 'mongoose';

const schema = mongoose.Schema;

const CategorySchema = new schema({
    categoryName: {
        type: String,
        maxlength: 50,
        required: true
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'disabled']
    }
});
const categoryModel = mongoose.model('category',CategorySchema);
export default categoryModel;
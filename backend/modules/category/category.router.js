import express from 'express';
const { addCategory, updateCategory, deleteCategory, listCategories, getCategory } = require('./category.controller');
import {isAuth,isAdmin} from '../../utils/ultil';
const router = express.Router();    

router.post('/add',isAuth,isAdmin, addCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/list' , listCategories);
router.get('/:id' , getCategory );
module.exports = router;    
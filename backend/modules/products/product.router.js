import express from 'express';
import { getProduct , saveProduct ,updateProduct,getProductdetails,deteleProduct} from './product.controller';
import { isAdmin,isAuth } from '../../utils/ultil';
const router = express.Router();    

router.get("/",getProduct);
router.get("/:id",getProductdetails);
router.post("/",isAdmin,isAuth,saveProduct);
router.put("/:id",updateProduct);
router.delete('/:id',isAdmin,isAuth,deteleProduct);
module.exports = router;
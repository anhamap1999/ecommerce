import express from 'express';
import { getProduct , saveProduct ,updateProduct,getProductdetails,deteleProduct} from './product.controller';
import { isAdmin,isAuth } from '../../utils/ultil';
const router = express.Router();    

router.get("/",getProduct);
router.get("/:id",getProductdetails);
router.post("/",isAuth,isAdmin,saveProduct);
router.put("/:id",isAuth,isAdmin,updateProduct);
router.delete('/:id',isAuth,isAdmin,deteleProduct);
module.exports = router;    
import express from 'express';
import { isAuth, isAdmin } from '../../utils/ultil';
import {getOrder, getOrderUser,removeOrder ,getOrderId,saveOrder,updateOrder} from './order.controller';
const router = express.Router();

router.get("/", isAuth, getOrder);
router.get("/mine", isAuth, getOrderUser);
router.get("/:id", isAuth, getOrderId);
router.delete("/:id", isAuth, isAdmin,removeOrder);
router.post("/", isAuth, saveOrder);
router.put("/:id/pay", isAuth,updateOrder);

module.exports = router; 
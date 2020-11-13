import express from 'express';
import {getAdmin,getUser,demo,userRegister} from './user.controllers';
const router = express.Router();    

router.get("/createadmin",getAdmin);
router.get("/admin",demo);
router.post("/signin",getUser);
router.post("/register",userRegister);
module.exports = router;
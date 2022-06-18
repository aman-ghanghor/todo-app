import express from 'express'
const router = express.Router() ;

import checkUserAuth from '../middlewares/auth-middleware.js';
import UserController from "../controllers/userController.js";

router.get('/', checkUserAuth) ;

router.get('/', UserController.getUser)
router.post('/register', UserController.userRegistration) ;
router.post('/login', UserController.userLogin) ;


export default router;
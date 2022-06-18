import express from 'express'
const router = express.Router() ;

import  checkUserAuth from "../middlewares/auth-middleware.js";
import TodoController from "../controllers/todoController.js";

router.all('/', checkUserAuth) ;

router.get('/', TodoController.getList) ;
router.post('/', TodoController.addItem)
router.put('/', TodoController.updateItem)
router.delete('/', TodoController.deleteItem)

export default router;



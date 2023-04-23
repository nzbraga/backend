import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController"
import { DetailUserController } from "./controllers/users/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateProtuctController } from "./controllers/product/CreateProductController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AdditemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderControllers";

import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer'
 
const router = Router();

const upload = multer(uploadConfig.upload("./temp"));


// -- ROTAS USER --

router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/userinfo', isAuthenticated, new DetailUserController().handle);


// -- ROTAS CATEGORIAS --

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUTOS --

router.post('/product', isAuthenticated, upload.single('file'), new CreateProtuctController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


// -- ROTAS PEDIDO -- 

router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated,new RemoveOrderController().handle);

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);








export {router};
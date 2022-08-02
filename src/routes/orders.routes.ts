import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import tokenValidation from '../middlewares/auth/token.validation';
import orderValidation from '../middlewares/order.validation';

const router = Router();
const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', tokenValidation, orderValidation, ordersController.create);

export default router;

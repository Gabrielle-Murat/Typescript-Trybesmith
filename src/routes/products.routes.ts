import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import productValidation from '../middlewares/product.validation';

const router = Router();
const productsController = new ProductsController();

router.post('/products', productValidation, productsController.create);
router.get('/products', productsController.getAll);

export default router;

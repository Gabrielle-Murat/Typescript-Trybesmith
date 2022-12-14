import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginValidation, loginController.userLogin);

export default router;

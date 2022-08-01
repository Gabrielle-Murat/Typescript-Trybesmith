import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import userValidation from '../middlewares/user.validation';

const router = Router();
const usersController = new UsersController();

router.post('/users', userValidation, usersController.create);

export default router;

import { Request, Response, NextFunction } from 'express';
import loginCreate from '../schemas/login.create';

function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = loginCreate.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

export default loginValidation;

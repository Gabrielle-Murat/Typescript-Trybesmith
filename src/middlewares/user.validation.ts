import { Request, Response, NextFunction } from 'express';
import userCreate from '../schemas/user.create';

function userValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = userCreate.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

export default userValidation;

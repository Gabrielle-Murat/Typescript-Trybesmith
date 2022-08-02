import { Request, Response, NextFunction } from 'express';
import orderCreate from '../schemas/order.create';

function orderValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = orderCreate.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

export default orderValidation;

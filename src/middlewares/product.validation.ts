import { Request, Response, NextFunction } from 'express';
import productCreate from '../schemas/product.create';

function productValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = productCreate.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(parseInt(code, 10)).json({ message });
  }

  return next();
}

export default productValidation;

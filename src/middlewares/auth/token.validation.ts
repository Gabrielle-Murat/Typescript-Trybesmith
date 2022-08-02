import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: Secret = `${process.env.JWT_SECRET}`;

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });

    // verificação de acordo com o novo Payload extendido
    const { data } = <jwt.Token>jwt.verify(token, jwtSecret);
    
    const response = data[0].id;

    // https://thewebdev.info/2022/02/26/how-to-pass-variables-to-the-next-middleware-using-next-in-express-js/
    // passando a variável para o próximo middleware (no caso, o controller)
    res.locals.id = response;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default tokenValidation;

import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import LoginService from '../services/login.service';

dotenv.config();

const jwtSecret: Secret = `${process.env.JWT_SECRET}`;
const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default class LoginController {
  constructor(private loginService = new LoginService()) { }
  
  public userLogin = async (req: Request, res: Response) => {
    const loginInfo = req.body;

    const response = await this.loginService.userLogin(loginInfo);

    if (response === 'invalid') {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    
    const token = jwt.sign({ data: response }, jwtSecret, jwtConfig);
  
    return res.status(200).json({ token });
  };
}

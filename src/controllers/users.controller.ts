import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import UsersService from '../services/users.service';

dotenv.config();

const jwtSecret: Secret = `${process.env.JWT_SECRET}`;
const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.usersService.create(user);
    const token = jwt.sign({ data: userCreated }, jwtSecret, jwtConfig);

    return res.status(201).json({ token });
  };
}

import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

export default class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;

    // variável advinda do middleware anterior (no caso, o tokenValidation)
    const userId = res.locals.id;

    const response = await this.ordersService.create(userId, productsIds);
    return res.status(201).json(response);
  };
}

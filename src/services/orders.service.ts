import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import Order from '../interfaces/order.interface';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();

    return orders;
  }

  public async create(userId: number, productsIds: number[]) {
    const orderId = await this.model.create(userId);

    const updatedProdIds = await Promise.all(productsIds.map(async (productId) => {
      const response = await this.model.updateProductsTable(orderId, productId);
      return response;
    }));

    return { userId, productsIds: updatedProdIds };
  }
}

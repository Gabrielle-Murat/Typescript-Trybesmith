import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  // json array aggregation:
  // https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(`
      SELECT
        ord.id, ord.userId, JSON_ARRAYAGG(pro.id) AS productsIds
      FROM
        Trybesmith.Orders AS ord
          INNER JOIN
        Trybesmith.Products AS pro ON ord.id = pro.orderId
      GROUP BY
        ord.id
      ORDER BY
        ord.userId;
    `);
    const [rows] = result;
    return rows as Order[];
  }

  public async create(userId: number): Promise<number> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [orderInserted] = result;
    const { insertId } = orderInserted;
    return insertId;
  }

  public async updateProductsTable(orderId: number, productId: number): Promise<number> {
    await this.connection.execute(
      `
        UPDATE Trybesmith.Products
        SET orderId = ?
        WHERE id = ?;
      `,
      [orderId, productId],
    );
    return productId;
  }
}

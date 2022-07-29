import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../interfaces/product.interface';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async create(product: Product): Promise<Product> {
    const productCreated = await this.model.create(product);
    return productCreated;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }
}

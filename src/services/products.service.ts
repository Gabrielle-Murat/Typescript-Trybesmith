import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../interfaces/product.interface';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }
}
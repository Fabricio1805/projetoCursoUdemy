import { Product } from '../models/Product';
import { productRepository } from '../repositories/ProductsRepository';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = productRepository.find();

    return products;
  }
}

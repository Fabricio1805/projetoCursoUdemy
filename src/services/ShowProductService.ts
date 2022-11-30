import AppError from '../errors/AppError';
import { Product } from '../models/Product';
import { productRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}
export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await productRepository.findOneBy({ id });
    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}

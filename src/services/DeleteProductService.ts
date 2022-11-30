import AppError from '../errors/AppError';
import { productRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}
export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await productRepository.findOneBy({ id });
    if (!product) {
      throw new AppError('Product not found.');
    }
    await productRepository.remove(product);
  }
}

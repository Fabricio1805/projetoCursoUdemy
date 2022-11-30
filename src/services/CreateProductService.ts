import AppError from '../errors/AppError';
import { Product } from '../models/Product';
import { productRepository } from '../repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExist = await productRepository.findOneBy({ name });

    if (productExist) {
      throw new AppError('There s already one product with this name');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

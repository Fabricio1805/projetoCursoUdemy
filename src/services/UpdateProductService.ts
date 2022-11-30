import AppError from '../errors/AppError';
import { Product } from '../models/Product';
import { productRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await productRepository.findOneBy({ id });
    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExist = await productRepository.findOneBy({ name });

    if (productExist && name !== product.name) {
      throw new AppError('There s already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    return product;
  }
}

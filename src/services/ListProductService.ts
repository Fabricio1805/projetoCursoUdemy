import { Product } from '../models/Product';
import { productRepository } from '../repositories/ProductsRepository';
import RedisCache from 'src/cache/RedisCache';
export class ListProductService {
  public async execute(): Promise<Product[]> {
    //const redisCache = new RedisCache();
    const products = productRepository.find();

    //await redisCache.save('teste', 'teste');

    return products;
  }
}

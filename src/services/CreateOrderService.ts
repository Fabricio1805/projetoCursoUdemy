import { In } from 'typeorm';
import AppError from '../errors/AppError';
import { Order } from '../models/Order';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { productRepository } from '../repositories/ProductsRepository';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async createOrder({
    customer_id,
    products,
  }: IRequest): Promise<Order> {
    const customerExists = await CustomersRepository.findOneBy({
      id: customer_id,
    });

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }
    const productIds = products.map(product => product.id);

    const existsProducts = await productRepository.find({
      where: {
        id: In(productIds),
      },
    });

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }
    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `the quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}`,
      );
    }
    const serializedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = OrdersRepository.create({
      customer: customerExists,
      order_products: serializedProducts,
    });

    await OrdersRepository.save(order);

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

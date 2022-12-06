import AppError from '../errors/AppError';
import { Order } from '../models/Order';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class ShowOrderService {
  public async show(id: string): Promise<Order | null> {
    const order = await OrdersRepository.findOne({
      where: {
        id,
      },
      relations: {
        order_products: true,
        customer: true,
      },
    });

    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}

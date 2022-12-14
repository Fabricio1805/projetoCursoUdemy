import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService';

export default class OrdersController {
  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.createOrder({
      customer_id,
      products,
    });

    return res.json(order);
  }

  public async showOrder(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showOrder = new ShowOrderService();

    const product = await showOrder.show(id);

    return res.json(product);
  }
}

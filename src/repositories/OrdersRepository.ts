import { AppDataSource } from '../data-source';
import { Order } from '../models/Order';

export const OrdersRepository = AppDataSource.getRepository(Order);

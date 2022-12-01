import { AppDataSource } from '../data-source';
import { Customer } from '../models/Customer';

export const CustomersRepository = AppDataSource.getRepository(Customer);

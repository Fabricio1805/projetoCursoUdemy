import AppError from '../errors/AppError';
import { Customer } from '../models/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

interface IRequest {
  id: string;
}
export class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findOneBy({ id });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

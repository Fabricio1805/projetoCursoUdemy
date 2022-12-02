import AppError from '../errors/AppError';
import { Customer } from '../models/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findOneBy({ id: id });

    if (!customer) {
      throw new AppError('customer not found.');
    }

    const customerExists = await CustomersRepository.findOneBy({
      email: email,
    });

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await CustomersRepository.save(customer);

    return customer;
  }
}

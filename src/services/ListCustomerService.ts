import { Customer } from '../models/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

export class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustomersRepository.find();

    return customers;
  }
}

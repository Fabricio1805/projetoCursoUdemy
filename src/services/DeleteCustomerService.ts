import AppError from '../errors/AppError';
import { CustomersRepository } from '../repositories/CustomersRepository';

interface IRequest {
  id: string;
}
export class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await CustomersRepository.findOneBy({ id });

    if (!customer) {
      throw new AppError('Customer not found.');
    }
    await CustomersRepository.remove(customer);
  }
}

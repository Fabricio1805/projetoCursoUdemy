import AppError from '../errors/AppError';
import { Customer } from '../models/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';
interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const emailExist = await CustomersRepository.findOneBy({ email });

    if (emailExist) {
      throw new AppError('Email address already used');
    }

    const customer = CustomersRepository.create({
      name,
      email,
    });

    await CustomersRepository.save(customer);

    return customer;
  }
}

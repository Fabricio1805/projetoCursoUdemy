import { hash } from 'bcrypt';
import AppError from '../errors/AppError';
import { User } from '../models/User';
import { userRepository } from '../repositories/UserRepository';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExist = await userRepository.findOneBy({ email });

    if (emailExist) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

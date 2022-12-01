import AppError from '../errors/AppError';
import { User } from '../models/User';
import { userRepository } from '../repositories/UserRepository';

interface IRequest {
  id: string;
}
export class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new AppError('user not found.');
    }
    return user;
  }
}

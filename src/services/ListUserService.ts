import { User } from '../models/User';
import { userRepository } from '../repositories/UserRepository';

export class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await userRepository.find();

    return users;
  }
}

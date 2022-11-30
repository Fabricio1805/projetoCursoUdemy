import AppError from '../errors/AppError';
import { User } from '../models/User';
import fs from 'fs';
import { userRepository } from '../repositories/UserRepository';
import path from 'path';
import uploadConfig from '../config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await userRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

import AppError from '../errors/AppError';
import { userTokenRepository } from '../repositories/UserTokenRepository';
import { userRepository } from '../repositories/UserRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await userTokenRepository.findOneBy({ token });

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }
    const user = await userRepository.findOne({
      where: {
        id: userToken.user_id,
      },
    });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token Expired.');
    }
    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await userRepository.save(user);
  }
}

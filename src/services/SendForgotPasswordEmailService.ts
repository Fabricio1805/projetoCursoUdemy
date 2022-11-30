import AppError from '../errors/AppError';
import { userTokenRepository } from '../repositories/UserTokenRepository';
import { userRepository } from '../repositories/UserRepository';
import { UserTokens } from '../models/UserTokens';

export class SendForgotPasswordEmailService {
  public async generate(email: string): Promise<void> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = await userTokenRepository.create({
      user_id: user.id,
    });

    await userTokenRepository.save(userToken);
    console.log(userToken);
  }
}

//user_id: string

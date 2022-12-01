import AppError from '../errors/AppError';
import { userTokenRepository } from '../repositories/UserTokenRepository';
import { userRepository } from '../repositories/UserRepository';
import EtherealMail from '../config/mail/EtherealMail';
import { User } from '../models/User';

export class SendForgotPasswordEmailService {
  public async generate(email: string): Promise<void> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = userTokenRepository.create({ user_id: user.id });

    await userTokenRepository.save(userToken);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API vendas] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token: userToken.token,
        },
      },
    });
  }
}

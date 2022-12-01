import AppError from '../errors/AppError';
import { userTokenRepository } from '../repositories/UserTokenRepository';
import { userRepository } from '../repositories/UserRepository';
import EtherealMail from '../config/mail/EtherealMail';
import path from 'path';
export class SendForgotPasswordEmailService {
  public async generate(email: string): Promise<void> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = userTokenRepository.create({ user_id: user.id });

    await userTokenRepository.save(userToken);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    console.log(forgotPasswordTemplate);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${userToken.token}`,
        },
      },
    });
  }
}

import AppError from '../errors/AppError';
import { userRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { User } from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async login({ email, password }: IRequest): Promise<IResponse> {
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = jwt.sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    //const { password: _, ...userLogin } = user;

    return {
      user,
      token,
    };
  }
}

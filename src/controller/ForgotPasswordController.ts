import { Request, Response } from 'express';
import { SendForgotPasswordEmailService } from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.generate(email);

    return res.status(204).json();
  }
}

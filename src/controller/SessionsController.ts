import { Request, Response } from 'express';
import { CreateSessionService } from '../services/CreateSessionService';

export default class SessionsController {
  public async createSessions(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();
    const user = await createSession.login({
      email,
      password,
    });

    return res.json({
      user,
    });
  }
}

import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';

export default class ProfileController {
  public async updateProfile(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    const { password: _, ...userLogin } = user;
    return res.status(200).json(userLogin);
  }

  public async ShowProfile(req: Request, res: Response): Promise<Response> {
    const ShowProfile = new ShowProfileService();
    const id = req.user.id;

    const user = await ShowProfile.execute({ id });

    const { password: _, ...userLogin } = user;
    return res.json(userLogin);
  }
}

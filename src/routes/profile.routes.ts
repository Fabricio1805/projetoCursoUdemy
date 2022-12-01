import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Authenticate from '../middlewares/Authenticated';
import ProfileController from '../controller/ProfileController';

const profileRoutes = Router();

const profileController = new ProfileController();
profileRoutes.use(Authenticate);

profileRoutes.get('/', profileController.ShowProfile);

profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confimation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.updateProfile,
);

export default profileRoutes;

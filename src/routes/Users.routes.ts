import { Router } from 'express';
import UserController from '../controller/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UserAvatarController from '../controller/UserAvatarController';

const usersRoutes = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createUser,
);

usersRoutes.get('/', usersController.listUser);

usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default usersRoutes;

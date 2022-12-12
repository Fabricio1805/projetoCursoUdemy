import { Router } from 'express';
import UserController from '../controller/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UserAvatarController from '../controller/UserAvatarController';
import Authenticate from '../middlewares/Authenticated';
import { validate } from 'src/middlewares/handleValidation';
import userCreateValidation from 'src/middlewares/userValidations';

const usersRoutes = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.post(
  '/',
  /*celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),*/
  userCreateValidation(),
  validate,
  usersController.createUser,
);

usersRoutes.get('/', usersController.listUser);

usersRoutes.use(Authenticate);
usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  usersAvatarController.updateAvatar,
);

export default usersRoutes;

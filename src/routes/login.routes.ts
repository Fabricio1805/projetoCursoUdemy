import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controller/SessionsController';

const loginRoutes = Router();
const loginController = new SessionsController();

loginRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  loginController.createSessions,
);

export default loginRoutes;

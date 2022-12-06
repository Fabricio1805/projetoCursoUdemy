import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Authenticate from '../middlewares/Authenticated';
import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(Authenticate);
ordersRouter.get('/', ordersController.showOrder);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.showOrder,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.createOrder,
);

export default ordersRouter;

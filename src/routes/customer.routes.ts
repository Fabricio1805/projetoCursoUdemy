import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Authenticate from '../middlewares/Authenticated';
import CustomerController from '../controller/CustomersController';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(Authenticate);
customerRouter.get('/', customerController.listCustomer);

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.showCustomer,
);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.createCustomer,
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.updateCustomer,
);

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.deleteCustomer,
);

export default customerRouter;

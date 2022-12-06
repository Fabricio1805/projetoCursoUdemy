import { Router } from 'express';
import customerRouter from './customer.routes';
import loginRoutes from './login.routes';
import ordersRouter from './order.routes';
import passwordRoutes from './password.routes';
import productsRouter from './products.routes';
import profileRoutes from './profile.routes';
import usersRoutes from './Users.routes';

const routes = Router();
routes.use('/login', loginRoutes);
routes.use('/profile', profileRoutes);
routes.use('/users', usersRoutes);
routes.use('/password', passwordRoutes);
routes.use('/customers', customerRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);

export default routes;

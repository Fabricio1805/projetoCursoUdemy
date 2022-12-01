import { Router } from 'express';
import loginRoutes from './login.routes';
import passwordRoutes from './password.routes';
import productsRouter from './products.routes';
import profileRoutes from './profile.routes';
import usersRoutes from './Users.routes';

const routes = Router();
routes.use('/login', loginRoutes);
routes.use('/profile', profileRoutes);
routes.use('/users', usersRoutes);
routes.use('/password', passwordRoutes);
routes.use('/products', productsRouter);

export default routes;

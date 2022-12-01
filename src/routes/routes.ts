import { Router } from 'express';
import Authenticate from '../middlewares/Authenticated';
import loginRoutes from './login.routes';
import passwordRoutes from './password.routes';
import productsRouter from './products.routes';
import usersRoutes from './Users.routes';

const routes = Router();
routes.use('/login', loginRoutes);

routes.use('/users', usersRoutes);
routes.use('/password', passwordRoutes);
routes.use(Authenticate);
routes.use('/products', productsRouter);

export default routes;

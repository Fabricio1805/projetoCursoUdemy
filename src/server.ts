import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/routes';
import { AppDataSource } from './data-source';
import uploadConfig from './config/upload';
import Errors from './middlewares/Errors';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.directory));

  app.use(routes);

  app.use(Errors);

  app.use(Errors);
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`RODANDO NA PORTA ${port}`);
  });
});

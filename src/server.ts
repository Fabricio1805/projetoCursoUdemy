import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import AppError from './errors/AppError';
import { AppDataSource } from './data-source';
import uploadConfig from './config/upload';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.directory));
  app.use(routes);
  app.use(errors());

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log('RODANDO <3');
  });
});

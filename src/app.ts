import express from 'express';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import errorHandler from './middleware/errorHandler';

export default function makeApp() {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  app.use('/', routes);

  // app.use(errorHandler);

  return app;
}

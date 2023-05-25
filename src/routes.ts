import { Express, Request, Response, Router } from 'express';
// controllers
import { createUserHandler } from './controller/user.controller';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from './controller/product.controller';
import {
  createCategoryHandler,
  getCategoryProductsHandler,
} from './controller/category.controller';

// middleware
import validateResource from './middleware/validateResource';
import requireUser from './middleware/requireUser';

// schemas
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createCategorySchema } from './schema/category.schema';

const router = Router();
router
  .route('/health-check')
  .get((req: Request, res: Response) => res.sendStatus(200));

router
  .route('/api/users')
  .post([validateResource(createUserSchema)], createUserHandler);

router
  .route('/api/sessions')
  .post([validateResource(createSessionSchema)], createUserSessionHandler)
  .get([requireUser], getUserSessionsHandler)
  .delete([requireUser], deleteSessionHandler);

router
  .route('/api/products')
  .post(
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

router
  .route('/api/products/:productId')
  .put(
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  )
  .get(validateResource(getProductSchema), getProductHandler)
  .delete(
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

router
  .route('/api/category')
  .post(
    [requireUser, validateResource(createCategorySchema)],
    createCategoryHandler
  );

router
  .route('/api/category/:categoryId/products')
  .get([requireUser], getCategoryProductsHandler);

export default router;

// export default function (app: Express) {
//   // health check routes
//   app.get('/health-check', (req: Request, res: Response) =>
//     res.sendStatus(200)
//   );

//   // user routes
//   app.post(
//     '/api/users',
//     [validateResource(createUserSchema)],
//     createUserHandler
//   );

//   // session routes
//   app.post(
//     '/api/sessions',
//     [validateResource(createSessionSchema)],
//     createUserSessionHandler
//   );
//   app.get('/api/sessions', [requireUser], getUserSessionsHandler);
//   app.delete('/api/sessions', [requireUser], deleteSessionHandler);

//   // product routes
//   app.post(
//     '/api/products',
//     [requireUser, validateResource(createProductSchema)],
//     createProductHandler
//   );
//   app.put(
//     '/api/products/:productId',
//     [requireUser, validateResource(updateProductSchema)],
//     updateProductHandler
//   );
//   app.get(
//     '/api/products/:productId',
//     validateResource(getProductSchema),
//     getProductHandler
//   );
//   app.delete(
//     '/api/products/:productId',
//     [requireUser, validateResource(deleteProductSchema)],
//     deleteProductHandler
//   );

//   // category routes
//   app.post(
//     '/api/category',
//     [requireUser, validateResource(createCategorySchema)],
//     createCategoryHandler
//   );
//   app.get(
//     '/api/category/:categoryId/products',
//     [requireUser],
//     getCategoryProductsHandler
//   );
// }

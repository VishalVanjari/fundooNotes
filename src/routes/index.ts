import express, { IRouter } from 'express';
const router = express.Router();
import userRoute from './user.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome to fundoo Notes App');
  });
  router.use('/users', new userRoute().getRoutes());

  return router;  
};

export default routes;

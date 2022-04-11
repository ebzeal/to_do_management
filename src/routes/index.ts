import { Router } from 'express';
import itemRoutes from './items';
import listRoutes from './list';

const routes = Router();

routes.use(listRoutes);
routes.use(itemRoutes);

routes.get('/', (req, res) => {
  res.status(200).json('Power your Todos!');
});



export default routes;

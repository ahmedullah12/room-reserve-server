import express from 'express';
import { UserRoutes } from '../modules/User/User.route';

const router = express.Router();

const moduelRouter = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduelRouter.forEach((route) => router.use(route.path, route.route));

export default router;

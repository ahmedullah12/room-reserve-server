import express from 'express';
import { UserRoutes } from '../modules/User/User.route';
import { RoomRoutes } from '../modules/Room/Room.route';

const router = express.Router();

const moduelRouter = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
];

moduelRouter.forEach((route) => router.use(route.path, route.route));

export default router;

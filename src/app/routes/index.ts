import express from 'express';

import { UserRoutes } from '../modules/user/user.route';
import AdminRoutes from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CarRoutes } from '../modules/car/car.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes.router,
  },
  {
    path: '/auth',
    route: UserRoutes.authRouter,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/cars',
    route: CarRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

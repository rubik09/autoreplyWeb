import Router from 'koa-router';
import clientsRoute from '../app/routes/clientsRoute.js';
import usersRoute from '../app/routes/usersRoute.js';

const router = new Router({
  prefix: '/api',
});

router.use(clientsRoute);
router.use(usersRoute);

export default router;

import Router from 'koa-router';
import clientsRoute from '../app/routes/clientsRoute';
import usersRoute from '../app/routes/usersRoute';

const router = new Router({
  prefix: '/api',
});

router.use(clientsRoute);
router.use(usersRoute);

export default router;

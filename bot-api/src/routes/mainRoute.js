import Router from 'koa-router';
import clientsRoute from '../app/clientsRoute';
import usersRoute from '../app/usersRoute';

const router = new Router();

router.use(clientsRoute);
router.use(usersRoute);


export default router;
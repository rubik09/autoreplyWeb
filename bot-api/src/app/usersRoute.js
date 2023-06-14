import Router from 'koa-router';
import { login } from './usersController';

const router = new Router();

router
  .post('/users/sessions', login);

export default router.routes();

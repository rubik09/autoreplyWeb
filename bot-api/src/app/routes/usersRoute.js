import Router from 'koa-router';
import { login, logout } from '../controllers/usersController';

const router = new Router();

router
  .post('/admin/sessions', login)
  .delete('/admin/sessions/:id', logout);

export default router.routes();

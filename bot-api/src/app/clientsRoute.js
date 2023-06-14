import Router from 'koa-router';
import {
  addUser, changeUserStatus, connectToTelegram,
  deleteUser, getAllUsers, getUser, logout, updateUser,
} from './clientsController';

const router = new Router();

router
  .post('/users/add', addUser)
  .post('/users/status', changeUserStatus)
  .post('/users/connect', connectToTelegram)
  .get('/users', getAllUsers)
  .get('/user/:id', getUser)
  .patch('/user', updateUser)
  .delete('/users/:id', deleteUser)
  .delete('/admin/sessions/:id', logout);

export default router.routes();

import Router from 'koa-router';
import {
  addClient, changeClientStatus, connectToTelegram,
  deleteClient, getAllClients, getClient, updateClient,
} from '../controllers/clientsController';

const router = new Router();

router
  .post('/clients/add', addClient)
  .post('/clients/status', changeClientStatus)
  .post('/clients/connect', connectToTelegram)
  .get('/clients', getAllClients)
  .get('/clients/:id', getClient)
  .patch('/clients', updateClient)
  .delete('/clients/:id', deleteClient);

export default router.routes();

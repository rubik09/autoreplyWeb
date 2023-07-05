import 'dotenv/config';
import { NewMessage } from 'telegram/events';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import firstInit from './utils/firstInit';
import emmiter from './utils/emitter';
import incomingMessages from './eventPrint';
import outGoingMessages from './outGoing';
import router from './routes/mainRoute';
import errorHandler from './app/middleware/errorHandling';
import logger from './app/middleware/logger';

emmiter.on('newClient', async (client) => {
  client.addEventHandler(
    (event) => incomingMessages(client, event),
    new NewMessage({ incoming: true }),
  );
  client.addEventHandler(
    (event) => outGoingMessages(client, event),
    new NewMessage({ outgoing: true }),
  );
});

await firstInit();

const app = new Koa();
const port = 8000;

app.use(parser())
  .use(cors({
    origin: 'http://13.50.162.152',
  }))
  .use(logger)
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ `);
  });

export default emmiter;

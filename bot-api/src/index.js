import 'dotenv/config';
import { NewMessage } from 'telegram/events';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import firstInit from './utils/firstInit';
import emmiter from './utils/emitter';
import {outgoingMessages, incomingMessages} from './statsCollection.js';
import router from './routes/mainRoute';
import errorHandler from './app/middleware/errorHandling';
import logger from './app/middleware/logger';
import {ADDRESS, PORT} from './config';
import routerHandler from './app/middleware/routerHanler';
import statsCalculating from "./statsCalculating.js";

emmiter.on('newClient', async (client) => {
  client.addEventHandler(
    (event) => incomingMessages(client, event),
    new NewMessage({ incoming: true }),
  );
  client.addEventHandler(
      (event) => outgoingMessages(client, event),
      new NewMessage({ outgoing: true }),
  );
});

await statsCalculating();
await firstInit();

const app = new Koa();

app.use(parser())
  .use(cors({
    origin: `${ADDRESS}`,
  }))
  .use(logger)
  .use(errorHandler)
  .use(routerHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(routerHandler)
  .listen(PORT, () => {
    console.log(`🚀 Server listening ${ADDRESS}:${PORT}/ `);
  });

export default emmiter;

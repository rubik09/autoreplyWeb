import 'dotenv/config';
import { NewMessage } from 'telegram/events';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import firstInit from './utils/firstInit';
import users from './app/users';
import mariaDb from './mariaDb';
import emmiter from './utils/emitter';
import incomingMessages from './eventPrint';
import checkConnect from './utils/checkingConnect';

await checkConnect();

emmiter.on('newClient', async (client) => {
  client.addEventHandler(
    (event) => incomingMessages(client, event),
    new NewMessage({ incoming: true }),
  );
});

await firstInit();

const app = new Koa();
const port = 8001;

mariaDb.connect();

app.use(parser())
  .use(cors())
  .use(users.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ `);
  });

export default emmiter;

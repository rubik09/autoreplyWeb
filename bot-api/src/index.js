import 'dotenv/config';
import { NewMessage } from 'telegram/events';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import eventPrint from './eventPrint';
import firstInit from './utils/firstInit';
import users from './app/users';
import mariaDb from './mariaDb';
import emmiter from './emitter';

emmiter.on('newClient', async (client) => {
  client.addEventHandler((event) => eventPrint(client, event), new NewMessage({}));
});

await firstInit();

const app = new Koa();
const port = 8000;

mariaDb.connect();

app.use(parser())
  .use(cors())
  .use(users.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ `);
  });

export default emmiter;

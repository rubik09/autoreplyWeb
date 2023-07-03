import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import emmiter from './utils/emitter';
import { clientsTelegram } from './index';

async function telegramInit(log_session, api_id, api_hash, client_id) {
  const stringSession = new StringSession(log_session);
  const client = new TelegramClient(stringSession, +api_id, api_hash, {
    connectionRetries: 5,
    sequentialUpdates: true,
  });

  await client.connect();
  await client.checkAuthorization();
  clientsTelegram[client_id] = client;
  client.floodSleepThreshold = 300;

  emmiter.emit('newClient', client);
}

export default telegramInit;

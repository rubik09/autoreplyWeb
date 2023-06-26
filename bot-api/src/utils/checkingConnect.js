import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import cron from 'node-cron';
import sessions from '../models/sessions';
import emmiter from './emitter';
import NewLogger from "./newLogger.js";

async function checkConnect() {
  cron.schedule('0 0 * * *', async () => {
    const allSessions = await sessions.getSessions();

    for (const session of allSessions) {
      const {
        log_session, status, api_id, api_hash,
      } = session;

      if (!status) continue;

      const stringSession = new StringSession(log_session);
      const client = new TelegramClient(stringSession, +api_id, api_hash, {
        connectionRetries: 5,
        sequentialUpdates: true,
        baseLogger: new NewLogger(),
      });
      await client.connect();
      client.floodSleepThreshold = 300;

      emmiter.emit('newClient', client);
    }
  });
}

export default checkConnect;

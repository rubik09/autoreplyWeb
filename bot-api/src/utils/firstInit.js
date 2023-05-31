import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import sessions from '../models/sessions';
import emmiter from './emitter';

async function firstInit() {
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
    });

    await client.connect();
    client.floodSleepThreshold = 300;

    emmiter.emit('newClient', client);
  }
}

export default firstInit;

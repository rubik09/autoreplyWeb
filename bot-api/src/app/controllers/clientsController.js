import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import sessions from '../../models/sessions';
import emmiter from '../../utils/emitter';
import NewLogger from '../../utils/newLogger';
import telegramInit, { clientsTelegram } from '../../telegramInit';
import {setupSteps, TABLE_LINK} from '../../config';
import throwError from '../../utils/throwError';

// add new tgUser
export const addClient = async (ctx) => {
  const {
    phone, user_id, username, geo,
  } = ctx.request.body;

  const validPone = await sessions.checkByPhone(phone);
  if (validPone.length) {
    throwError('phone already exist', 400);
  }

  const validUserId = await sessions.checkByUserId(user_id);
  if (validUserId.length) {
    throwError('user_id already exist', 400);
  }

  const validUsername = await sessions.checkByUsername(username);
  if (validUsername.length) {
    throwError('username already exist', 400);
  }

  await sessions.saveMainInfo(phone, user_id, username, geo);

  ctx.body = {
    message: 'Success',
  };
};

// change status
export const changeClientStatus = async (ctx) => {
  const { id } = ctx.request.body;
  const status = await sessions.getStatusById(id);
  await sessions.changeStatus(id, !status[0].status);
  const session = await sessions.getMainInfo(id);
  const {
    log_session, api_hash, api_id, user_id,
  } = session[0];
  !status[0].status ? await telegramInit(log_session, api_id, api_hash, user_id) : (clientsTelegram[user_id]?.destroy(), delete clientsTelegram[user_id]);

  ctx.body = {
    message: 'Success',
    bool: !status[0].status,
  };
};

const clients = {};
const promises = {};
const clientStartPromise = {};

function generatePromise() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { resolve, reject, promise };
}

export const connectToTelegram = async (ctx) => {
  const {
    setupStep, keywords, code, user_id, account_password,
  } = ctx.request.body;
  let { api_id, api_hash } = ctx.request.body;
  let stringSession = new StringSession('');
  let phone_number = await sessions.getPhoneById(user_id);
  phone_number = phone_number[0].phone_number;

  if (!api_hash || !api_id) {
    const mainInfo = await sessions.getMainInfoByUserId(user_id);

    api_id = mainInfo[0].api_id;
    api_hash = mainInfo[0].api_hash;
    stringSession = new StringSession(mainInfo[0].log_session);
  }

  if (setupStep === setupSteps.firstStep) {
    const client = new TelegramClient(stringSession, +api_id, api_hash, {
      connectionRetries: 5,
      sequentialUpdates: true,
      baseLogger: new NewLogger(),
    });

    clients[user_id] = client;
    await client.connect();
    client.floodSleepThreshold = 300;

    promises[user_id] = generatePromise();

    clientStartPromise[user_id] = client.start({
      phoneNumber: phone_number,
      password: async () => {
        const password = await promises[user_id].promise;
        promises[user_id] = generatePromise();
        return password.account_password;
      },
      phoneCode: async () => {
        const codeProm = await promises[user_id].promise;
        promises[user_id] = generatePromise();
        return codeProm.code;
      },
      onError: () => {
        ctx.status = 500;
        ctx.body = {
          message: 'Internal server error',
        };
      },
    });

    await sessions.updateSessionInfo(+api_id, api_hash, user_id);

    ctx.body = {
      message: 'Success',
    };
  } else if (setupStep === setupSteps.secondStep) {
    await promises[user_id].resolve({account_password, code});
    await promises[user_id].resolve({account_password, code});
    const client = clients[user_id];
    const session = client.session.save();
    await sessions.updateLogSession(session, user_id);

    await clientStartPromise[user_id];

    await sessions.updateStatus(true, user_id);

    ctx.body = {
      message: 'Success',
    };
  } else if (setupStep === setupSteps.thirdStep) {
    await sessions.updateKeywordsToSession(JSON.stringify(keywords), user_id);
    const client = clients[user_id];
    emmiter.emit('newClient', client);

    ctx.body = {
      message: 'Success',
    };
  }
};

// update user
export const updateClient = async (ctx) => {
  const {
    keywords, region, username, id,
  } = ctx.request.body;

  await sessions.updateClientById(JSON.stringify(keywords), region, username, id);

  ctx.body = {
    message: 'Success',
  };
};

// get all users
export const getAllClients = async (ctx) => {
  const users = await sessions.getSessions();

  const usersToSend = users.map(({ region, status, username, id}) => ({ region, status, username, id, TABLE_LINK }));

  ctx.body = {
    message: 'Success',
    usersToSend,
  };
};

// get user by id
export const getClient = async (ctx) => {
  const { id } = ctx.params;
  const user = await sessions.getClientById(id);
  if (!user.length) {
    throwError('user not exist', 404);
  }
  const {
    user_id, phone_number, region, username, keywords,
  } = user[0];

  ctx.body = {
    message: 'Success',
    user: {
      id, user_id, phone_number, region, username, keywords,
    },
  };
};

// удаление лички
export const deleteClient = async (ctx) => {
  const { id } = ctx.params;
  const user = await sessions.getClientById(id);

  if (!user.length) {
    throwError('user not exist', 404);
  }

  await sessions.deleteClient(id);

  ctx.body = {
    message: 'Success',
  };
};

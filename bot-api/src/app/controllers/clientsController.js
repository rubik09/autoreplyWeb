import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import sessions from '../../models/sessions';
import emmiter from '../../utils/emitter';
import telegramInit, { clientsTelegram } from '../../telegramInit';

// добавление новой лички
export const addClient = async (ctx) => {
  const {
    phone, user_id, username, geo,
  } = ctx.request.body;

  if (await sessions.checkByPhone(phone)) {
    ctx.status = 400;
    ctx.body = {
      error: 400,
      phone: 'Пользователь с таким телефоном уже существует.',
    };
    return;
  }

  if (await sessions.checkByUserId(user_id)) {
    ctx.status = 400;
    ctx.body = {
      error: 400,
      user_id: 'Пользователь с таким user_id уже существует.',
    };
    return;
  }

  if (await sessions.checkByUsername(username)) {
    ctx.status = 400;
    ctx.body = {
      error: 400,
      username: 'Пользователь с таким username уже существует.',
    };
    return;
  }

  await sessions.saveMainInfo(phone, user_id, username, geo);

  ctx.body = {
    message: 'Success',
  };
};

// изменение статуса
export const changeClientStatus = async (ctx) => {
  const { client_id } = ctx.request.body;
  const bool = await sessions.changeStatus(client_id);
  const status = await sessions.getStatusByUserId(client_id);
  const session = await sessions.getMainInfo(client_id);
  const { log_session, api_hash, api_id } = session[0];
  if (status[0].status) {
    await telegramInit(log_session, api_id, api_hash, client_id);
  }
  if (!status[0].status) {
    const client = clientsTelegram[client_id];
    if (client) {
      client.destroy();
      delete clientsTelegram[client_id];
    }
  }
  ctx.body = {
    message: 'Success',
    bool,
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
    setupStep, answer, code, user_id,
  } = ctx.request.body;
  let { api_id, api_hash } = ctx.request.body;
  let stringSession = new StringSession('');
  let phone_number = await sessions.getPhoneById(user_id);
  phone_number = phone_number[0].phone_number;

  if (!api_hash || !api_id) {
    const mainInfo = await sessions.getMainInfo(user_id);

    api_id = mainInfo[0].api_id;
    api_hash = mainInfo[0].api_hash;
    stringSession = new StringSession(mainInfo[0].log_session);
  }

  if (setupStep === 1) {
    const client = new TelegramClient(stringSession, +api_id, api_hash, {
      connectionRetries: 5,
      sequentialUpdates: true,
    });

    clients[user_id] = client;
    await client.connect();
    client.floodSleepThreshold = 300;

    promises[user_id] = generatePromise();

    clientStartPromise[user_id] = client.start({
      phoneNumber: phone_number,
      phoneCode: async () => {
        const codeProm = await promises[user_id].promise;
        promises[user_id] = generatePromise();
        return codeProm;
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
  } else if (setupStep === 2) {
    await promises[user_id].resolve(code);
    const client = clients[user_id];
    const session = client.session.save();
    await sessions.updateLogSession(session, user_id);

    await clientStartPromise[user_id];

    await sessions.updateStatus(true, user_id);

    ctx.body = {
      message: 'Success',
    };
  } else if (setupStep === 3) {
    await sessions.updateAnswersToSession(answer, user_id);
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
    answers, region, username, user_id,
  } = ctx.request.body;

  await sessions.updateClientByUserId(answers, region, username, user_id);

  const user = await sessions.getClientByUserId(user_id);

  ctx.body = {
    message: 'Success',
    user,
  };
};

// get all users
export const getAllClients = async (ctx) => {
  const users = await sessions.getSessions();

  ctx.body = {
    message: 'Success',
    users,
  };
};

// get user by id
export const getClient = async (ctx) => {
  const user_id = ctx.params.id;
  const user = await sessions.getClientByUserId(user_id);

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: 'user not exist',
    };
    return;
  }

  ctx.body = {
    message: 'Success',
    user: user[0],
  };
};

// удаление лички
export const deleteClient = async (ctx) => {
  const user_id = ctx.params.id;
  const user = await sessions.getSession(user_id);

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: 'user not exist',
    };
    return;
  }

  await sessions.deleteClient(user_id);

  ctx.body = {
    message: 'Success',
  };
};

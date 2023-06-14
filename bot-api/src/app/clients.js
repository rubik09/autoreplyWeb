import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import Router from 'koa-router';
import sessions from '../models/sessions';
import emmiter from '../utils/emitter';
import auth from '../middlewares/auth';
import Admins from '../models/admins';

const router = new Router();

// добавление новой лички
router.post('/users/add', auth, async (ctx) => {
  const {
    phone, user_id, username, geo,
  } = ctx.request.body;
  try {
    await sessions.saveMainInfo(phone, user_id, username, geo);

    ctx.body = {
      message: 'Success',
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// изменение статуса
router.post('/users/status', auth, async (ctx) => {
  const { user_id } = ctx.request.body;
  try {
    const bool = await sessions.changeStatus(user_id);

    ctx.body = {
      message: 'Success',
      bool,
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

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

// Подключение к тг
router.post('/users/api', auth, async (ctx) => {
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
    try {
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
    } catch (e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error',
      };
    }
  } else if (setupStep === 2) {
    try {
      await promises[user_id].resolve(code);
      const client = clients[user_id];
      const session = client.session.save();
      await sessions.updateLogSession(session, user_id);

      await clientStartPromise[user_id];

      await sessions.updateStatus(true, user_id);

      ctx.body = {
        message: 'Success',
      };
    } catch (e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error',
      };
    }
  } else if (setupStep === 3) {
    try {
      await sessions.updateAnswersToSession(answer, user_id);
      const client = clients[user_id];
      emmiter.emit('newClient', client);

      ctx.body = {
        message: 'Success',
      };
    } catch (e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error',
      };
    }
  }
});

// update user
router.patch('/user', auth, async (ctx) => {
  try {
    const {
      answers, region, username, user_id,
    } = ctx.request.body;

    await sessions.updateClientByUserId(answers, region, username, user_id);

    const user = await sessions.getClientByUserId(user_id);

    ctx.body = {
      message: 'Success',
      user,
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// get all users
router.get('/users', auth, async (ctx) => {
  try {
    const users = await sessions.getSessions();

    ctx.status = 200;
    ctx.body = {
      message: 'Success',
      users,
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// get user by id
router.get('/user/:id', auth, async (ctx) => {
  try {
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
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// удаление лички
router.delete('/users/:id', auth, async (ctx) => {
  try {
    const user_id = ctx.params.id;
    const user = await sessions.getSession(user_id);

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: 'user not exist',
      };
      return;
    }

    await sessions.deleteUser(user_id);

    ctx.body = {
      message: 'Success',
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// logout
router.delete('/admin/sessions/:id', async (ctx) => {
  try {
    const { id } = ctx.params;

    const user = await Admins.getAdminById(id);

    if (!user.length) {
      ctx.status = 404;
      ctx.body = {
        message: 'user not exist',
      };
      return;
    }

    ctx.body = {
      message: 'Success',
    };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

export default router;

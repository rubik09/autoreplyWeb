import bcrypt from 'bcrypt';
import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import Router from 'koa-router';
import sessions from '../models/sessions';
import emmiter from '../utils/emitter';
import autoRespondClient from '../models/autoRespondClient';
import Admins from '../models/admins';

const router = new Router();

router.post('/users/sessions', async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const result = await Admins.getClient(email);
    if (result.length === 0) {
      ctx.status = 401;
      ctx.body = {
        message: 'user not exist',
      };
      return;
    }
    const user = result[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      ctx.status = 401;
      ctx.body = {
        message: 'invalid email or password',
      };
      return;
    }
    ctx.body = {
      message: 'Success',
      user,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
});

// router.post('/users', async (ctx) => {
//   const {
//     email, password,
//   } = ctx.request.body;
//   try {
//     const existingUser = await Admins.getClient(email);
//     if (existingUser.length > 0) {
//       ctx.status = 401;
//       ctx.body = {
//         message: 'User with this phone already exists',
//       };
//       return;
//     }
//     const hash = await bcrypt.hash(password, 10);
//     await Admins.setMainInfo(email, hash);
//     const user = await Admins.getClient(email);
//     ctx.body = {
//       message: 'Success',
//       user: user[0],
//     };
//   } catch (err) {
//     console.log(err);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

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

router.post('/users/api', async (ctx) => {
  const {
    setupStep, answer, code, phone_number,
  } = ctx.request.body;
  let { api_id, api_hash } = ctx.request.body;
  let stringSession = new StringSession('');
  let user_id = await autoRespondClient.getClientId(phone_number);
  user_id = user_id[0].user_id;

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

      const session = client.session.save();
      await sessions.updateSessionInfo(session, api_id, api_hash, user_id);

      ctx.body = {
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error',
      };
    }
  } else if (setupStep === 2) {
    try {
      await promises[user_id].resolve(code);

      await clientStartPromise[user_id];

      await sessions.updateStatus(true, user_id);

      ctx.body = {
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error',
      };
    }
  }
});

router.delete('/users/sessions', async (ctx) => {
  const { phone } = ctx.request.body;

  const user = await autoRespondClient.getClient(phone);

  if (!user) {
    ctx.body = {
      message: 'Success',
    };
    return;
  }

  ctx.body = {
    message: 'Success',
    user: user[0],
  };
});

export default router;

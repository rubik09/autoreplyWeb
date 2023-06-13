import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import Router from 'koa-router';
import sessions from '../models/sessions';
import emmiter from '../utils/emitter';

// добавление новой лички
export const addUser = async (ctx) => {
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
}
// router.post('/users/add', async (ctx) => {
//   const {
//     phone, user_id, username, geo,
//   } = ctx.request.body;
//   try {
//     await sessions.saveMainInfo(phone, user_id, username, geo);

//     ctx.body = {
//       message: 'Success',
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

// изменение статуса
export const changeUserStatus = async (ctx) => {
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
}
// router.post('/users/status', async (ctx) => {
//   const { user_id } = ctx.request.body;
//   try {
//     const bool = await sessions.changeStatus(user_id);

//     ctx.body = {
//       message: 'Success',
//       bool,
//     };
//   } catch (e) {
//     console.log(e);
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
}
// Подключение к тг
//router.post('/users/connect', async (ctx) => {
  // const {
  //   setupStep, answer, code, user_id,
  // } = ctx.request.body;
  // let { api_id, api_hash } = ctx.request.body;
  // let stringSession = new StringSession('');
  // let phone_number = await sessions.getPhoneById(user_id);
  // phone_number = phone_number[0].phone_number;

  // if (!api_hash || !api_id) {
  //   const mainInfo = await sessions.getMainInfo(user_id);

  //   api_id = mainInfo[0].api_id;
  //   api_hash = mainInfo[0].api_hash;
  //   stringSession = new StringSession(mainInfo[0].log_session);
  // }

  // if (setupStep === 1) {
  //   try {
  //     const client = new TelegramClient(stringSession, +api_id, api_hash, {
  //       connectionRetries: 5,
  //       sequentialUpdates: true,
  //     });

  //     clients[user_id] = client;
  //     await client.connect();
  //     client.floodSleepThreshold = 300;

  //     promises[user_id] = generatePromise();

  //     clientStartPromise[user_id] = client.start({
  //       phoneNumber: phone_number,
  //       phoneCode: async () => {
  //         const codeProm = await promises[user_id].promise;
  //         promises[user_id] = generatePromise();
  //         return codeProm;
  //       },
  //       onError: () => {
  //         ctx.status = 500;
  //         ctx.body = {
  //           message: 'Internal server error',
  //         };
  //       },
  //     });

  //     await sessions.updateSessionInfo(+api_id, api_hash, user_id);

  //     ctx.body = {
  //       message: 'Success',
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     ctx.status = 500;
  //     ctx.body = {
  //       message: 'Internal server error',
  //     };
  //   }
  // } else if (setupStep === 2) {
  //   try {
  //     await promises[user_id].resolve(code);
  //     const client = clients[user_id];
  //     const session = client.session.save();
  //     await sessions.updateLogSession(session, user_id);

  //     await clientStartPromise[user_id];

  //     await sessions.updateStatus(true, user_id);

  //     ctx.body = {
  //       message: 'Success',
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     ctx.status = 500;
  //     ctx.body = {
  //       message: 'Internal server error',
  //     };
  //   }
  // } else if (setupStep === 3) {
  //   try {
  //     await sessions.updateAnswersToSession(answer, user_id);
  //     const client = clients[user_id];
  //     emmiter.emit('newClient', client);

  //     ctx.body = {
  //       message: 'Success',
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     ctx.status = 500;
  //     ctx.body = {
  //       message: 'Internal server error',
  //     };
  //   }
  // }
//});

// update user
export const updateUser = async (ctx) => {
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
}
// router.patch('/user', async (ctx) => {
//   try {
//     const {
//       answers, region, username, user_id,
//     } = ctx.request.body;

//     await sessions.updateClientByUserId(answers, region, username, user_id);

//     const user = await sessions.getClientByUserId(user_id);

//     ctx.body = {
//       message: 'Success',
//       user,
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

// get all users
export const getAllUsers = async (ctx) => {
  try {
    const users = await sessions.getSessions();

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
}
// router.get('/users', async (ctx) => {
//   try {
//     const users = await sessions.getSessions();

//     ctx.body = {
//       message: 'Success',
//       users,
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

// get user by id
export const getUser = async (ctx) => {
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
}
// router.get('/user/:id', async (ctx) => {
//   try {
//     const user_id = ctx.params.id;
//     const user = await sessions.getClientByUserId(user_id);

//     if (!user) {
//       ctx.status = 404;
//       ctx.body = {
//         message: 'user not exist',
//       };
//       return;
//     }

//     ctx.body = {
//       message: 'Success',
//       user: user[0],
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

// удаление лички
export const deleteUser = async (ctx) => {
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
}
// router.delete('/users/:id', async (ctx) => {
//   try {
//     const user_id = ctx.params.id;
//     const user = await sessions.getSession(user_id);

//     if (!user) {
//       ctx.status = 404;
//       ctx.body = {
//         message: 'user not exist',
//       };
//       return;
//     }

//     await sessions.deleteUser(user_id);

//     ctx.body = {
//       message: 'Success',
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });

// logout
export const logout = async (ctx) => {
  try {
    const { phone } = ctx.request.body;

    const user = await sessions.getClient(phone);

    if (!user) {
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
}
// router.delete('/users/sessions', async (ctx) => {
//   try {
//     const { phone } = ctx.request.body;

//     const user = await sessions.getClient(phone);

//     if (!user) {
//       ctx.status = 404;
//       ctx.body = {
//         message: 'user not exist',
//       };
//       return;
//     }

//     ctx.body = {
//       message: 'Success',
//     };
//   } catch (e) {
//     console.log(e);
//     ctx.status = 500;
//     ctx.body = {
//       message: 'Internal server error',
//     };
//   }
// });


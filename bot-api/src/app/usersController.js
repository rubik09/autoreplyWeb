import bcrypt from 'bcrypt';
import Admins from '../models/admins';

// const router = new Router({
//   prefix: '/api',
// });

// Вход
export const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const result = await Admins.getAdmin(email);
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
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
};

export const logout = async (ctx) => {
  try {
    const { id } = ctx.params;

    console.log(id);

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
};
// router.post('/users/sessions', async (ctx) => {
//   const { email, password } = ctx.request.body;
//   try {
//     const result = await Admins.getClient(email);
//     if (result.length === 0) {
//       ctx.status = 401;
//       ctx.body = {
//         message: 'user not exist',
//       };
//       return;
//     }
//     const user = result[0];
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       ctx.status = 401;
//       ctx.body = {
//         message: 'invalid email or password',
//       };
//       return;
//     }
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

// export default router;

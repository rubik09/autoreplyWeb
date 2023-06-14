import Router from 'koa-router';
import bcrypt from 'bcrypt';
import Admins from '../models/admins';

const router = new Router();

// Вход
router.post('/users/sessions', async (ctx) => {
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
});

export default router;

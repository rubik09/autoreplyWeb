import { verify } from 'jsonwebtoken';
import admins from '../../models/admins';
import { SECRET_KEY } from '../../config';

const auth = async (ctx, next) => {
  const token = ctx.request.headers.authorization;

  if (!token) {
    ctx.status = 403;
    ctx.body = {
      message: 'No token provided!',
    };
  }

  verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      ctx.status = 401;
      ctx.body = {
        message: 'Unauthorized!',
      };
      return;
    }
    const user = await admins.getAdminById(decoded?.id);
    ctx.status = 200;
    ctx.body = {
      message: 'success!',
      user: user[0],
    };
  });
  return next();
};

export default auth;

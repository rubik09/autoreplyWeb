import bcrypt from 'bcrypt';
import Admins from '../../models/admins';

// login
export const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  console.log(email, password)
  const result = await Admins.getAdmin(email);
  if (result.length === 0) {
    console.log(result)
    const err = new Error('user not exist');
    err.status = 401;
    throw err;
  }
  const user = result[0];
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const err = new Error('password is not valid');
    err.status = 400;
    throw err;
  }
  ctx.body = {
    message: 'Success',
    user,
  };
};

//logout
export const logout = async (ctx) => {
  const { id } = ctx.params;
  console.log(ctx)
  console.log(id)

  const user = await Admins.getAdminById(id);

  if (!user.length) {
    const err = new Error('user not exist');
    err.status = 404;
    throw err;
  }

  ctx.body = {
    message: 'Success',
  };
};

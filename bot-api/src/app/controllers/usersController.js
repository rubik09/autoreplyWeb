import bcrypt from 'bcrypt';
import Admins from '../../models/admins';
import throwError from '../../utils/throwError';

// login
export const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const result = await Admins.getAdmin(email);
  if (result.length === 0) {
    throwError('user not exist', 401);
  }
  const adminPassword = result[0].password;
  const isValidPassword = await bcrypt.compare(password, adminPassword);
  if (!isValidPassword) {
    throwError('password is not valid', 400);
  }
  ctx.body = {
    message: 'Success',
    user,
  };
};

//logout
export const logout = async (ctx) => {
  const { id } = ctx.params;
  const user = await Admins.getAdminById(id);

  if (!user.length) {
    throwError('admin not exist', 404);
  }

  ctx.body = {
    message: 'Success',
  };
};

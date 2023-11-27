import pool from '../utils/MySQL';

class Admins {
  constructor() {
    this.sql = pool;
  }

  async getAdmin(email) {
    return this.sql.query('SELECT * FROM admins WHERE ?', [{ email }]);
  }

  async getAdminById(id) {
    return this.sql.query('SELECT * FROM admins WHERE ?', [{ id }]);
  }
}

export default new Admins();

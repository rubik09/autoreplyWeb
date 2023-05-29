import pool from '../utils/MySQL';

class Admins {
  constructor() {
    this.sql = pool;
  }

  async getClient(email) {
    return this.sql.query('SELECT * FROM admins WHERE ?', [{ email }]);
  }

  async setMainInfo(hash, email) {
    return this.sql.query('INSERT INTO admins (password, email) VALUES (?, ?)', [hash, email]);
  }
}

export default new Admins();

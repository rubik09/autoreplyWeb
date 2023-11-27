import pool from '../utils/MySQL';

class User {
  constructor() {
    this.sql = pool;
  }

  async getUserId(api_id_client, user_id) {
    return this.sql.query('SELECT user_id FROM users WHERE ? AND ?', [{ api_id_client }, { user_id }]);
  }

  async addUser(user_id, api_id_client) {
    return this.sql.query('INSERT INTO users SET ?;', { user_id, api_id_client});
  }

  async getCountUsers(api_id_client) {
    return this.sql.query('SELECT COUNT(*) FROM users WHERE ?', [{ api_id_client }]);
  }
}

export default new User();

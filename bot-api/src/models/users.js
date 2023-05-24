import pool from '../utils/MySQL';

class User {
  constructor() {
    this.sql = pool;
  }

  async getUserId(api_id_client, user_id) {
    return this.sql.query('SELECT user_id FROM users WHERE ? AND ?', [{ api_id_client }, { user_id }]);
  }

  async addUser(userId, apiId, answers) {
    return this.sql.query('INSERT INTO users SET ?;', { user_id: userId, api_id_client: apiId, answers });
  }

  async getUsersId() {
    return this.sql.query('SELECT user_id FROM users');
  }

  async getAnswers(api_id_client, user_id) {
    return this.sql.query('SELECT answers FROM users WHERE ? and ?', [{ api_id_client }, { user_id }]);
  }

  async getAnswersCount(api_id_client) {
    return this.sql.query('SELECT answers FROM users WHERE ?', [{ api_id_client }]);
  }

  async updateStageStatus(answers, user_id) {
    return this.sql.query('UPDATE users SET ? WHERE ?', [{ answers }, { user_id }]);
  }

  async getCountUsers(api_id_client) {
    return this.sql.query('SELECT COUNT(*) FROM users WHERE ?', [{ api_id_client }]);
  }
}

export default new User();

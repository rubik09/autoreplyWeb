import pool from '../utils/MySQL';

class User {
  constructor() {
    this.sql = pool;
  }

  async getUserId(api_id_client, user_id) {
    return this.sql.query('SELECT user_id FROM users WHERE ? AND ?', [{ api_id_client }, { user_id }]);
  }

  async addUser(user_id, api_id_client, answers, incoming_messages_count) {
    return this.sql.query('INSERT INTO users SET ?;', {
      user_id, api_id_client, answers, incoming_messages_count,
    });
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

  async updateStageStatus(answers, user_id, api_id_client) {
    return this.sql.query('UPDATE users SET ? WHERE ? AND ?', [{ answers }, { user_id }, { api_id_client }]);
  }

  async getCountUsers(api_id_client) {
    return this.sql.query('SELECT COUNT(*) FROM users WHERE ?', [{ api_id_client }]);
  }

  async updateIncomingMessagesCount(incoming_messages_count, user_id, api_id_client) {
    return this.sql.query('UPDATE users SET ? WHERE ? AND ?', [{ incoming_messages_count }, { user_id }, { api_id_client }]);
  }

  async getIncomingMessagesUserCount(api_id_client, user_id) {
    return this.sql.query('SELECT incoming_messages_count FROM users WHERE ? AND ?', [{ api_id_client }, { user_id }]);
  }
}

export default new User();

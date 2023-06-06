import pool from '../utils/MySQL';

class Session {
  constructor() {
    this.sql = pool;
  }

  async updateStatus(status, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ status }, { user_id }]);
  }

  async getStatusByUserId(user_id) {
    return this.sql.query('SELECT status FROM sessions WHERE ?', { user_id });
  }

  async getSessions() {
    return this.sql.query('SELECT * FROM sessions');
  }

  async addSession(log_session, user_id) {
    return this.sql.query('INSERT INTO sessions SET ?;', { log_session, user_id });
  }

  async saveMainInfo(phone_number, user_id, username, region) {
    return this.sql.query('INSERT INTO sessions SET ?;', {
      phone_number, user_id, username, region,
    });
  }

  async updateApiId(api_id, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ api_id }, { user_id }]);
  }

  async updateApiHash(api_hash, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ api_hash }, { user_id }]);
  }

  async getSession(user_id) {
    return this.sql.query('SELECT log_session FROM sessions WHERE ?', [{ user_id }]);
  }

  async getApiId(user_id) {
    return this.sql.query('SELECT api_id FROM sessions WHERE ?', [{ user_id }]);
  }

  async getApiHash(user_id) {
    return this.sql.query('SELECT api_hash FROM sessions WHERE ?', [{ user_id }]);
  }

  async getClientUserId(api_id) {
    return this.sql.query('SELECT user_id FROM sessions WHERE ?', [{ api_id }]);
  }

  async updateLogSession(log_session, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ log_session }, { user_id }]);
  }

  async updateSessionInfo(api_id, api_hash, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ api_id, api_hash }, { user_id }]);
  }

  async updateAnswersToSession(answers, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ answers }, { user_id }]);
  }

  async getStatus(api_id) {
    return this.sql.query('SELECT status FROM sessions WHERE ?', [{ api_id }]);
  }

  async changeStatus(user_id) {
    const status = await this.getStatusByUserId(user_id);
    await this.sql.query('UPDATE sessions SET ? WHERE ?', [{ status: !status[0].status }, { user_id }]);
    return !status[0].status;
  }

  async getAnswersFromSession(api_id) {
    return this.sql.query('SELECT answers FROM sessions WHERE ?', [{ api_id }]);
  }

  async getMainInfo(user_id) {
    return this.sql.query('SELECT api_id, api_hash, log_session FROM sessions WHERE ?', [{ user_id }]);
  }

  async deleteUser(user_id) {
    return this.sql.query('DELETE FROM sessions WHERE ?;', [{ user_id }]);
  }

  async getPhoneById(user_id) {
    return this.sql.query('SELECT phone_number FROM sessions WHERE ?', [{ user_id }]);
  }

  async getClient(phone_number) {
    return this.sql.query('SELECT * FROM sessions WHERE ?', [{ phone_number }]);
  }

  async getClientByUserId(user_id) {
    return this.sql.query('SELECT * FROM sessions WHERE ?', [{ user_id }]);
  }

  async updateClientByUserId(answers, region, username, user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ answers, region, username }, { user_id }]);
  }
}

export default new Session();

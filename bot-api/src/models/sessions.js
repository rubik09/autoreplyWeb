import pool from '../utils/MySQL';

class Session {
  constructor() {
    this.sql = pool;
  }

  async updateStatus(status, client_user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ status }, { client_user_id }]);
  }

  async getStatus(client_user_id) {
    return this.sql.query('SELECT status FROM sessions WHERE ?', { client_user_id });
  }

  async getSessions() {
    return this.sql.query('SELECT * FROM sessions');
  }

  async addSession(log_session, client_user_id) {
    return this.sql.query('INSERT INTO sessions SET ?;', { log_session, client_user_id });
  }

  async updateApiId(api_id, client_user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ api_id }, { client_user_id }]);
  }

  async updateApiHash(api_hash, client_user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ api_hash }, { client_user_id }]);
  }

  async getSession(client_user_id) {
    return this.sql.query('SELECT log_session FROM sessions WHERE ?', [{ client_user_id }]);
  }

  async getApiId(client_user_id) {
    return this.sql.query('SELECT api_id FROM sessions WHERE ?', [{ client_user_id }]);
  }

  async getApiHash(client_user_id) {
    return this.sql.query('SELECT api_hash FROM sessions WHERE ?', [{ client_user_id }]);
  }

  async getClientUserId(api_id) {
    return this.sql.query('SELECT client_user_id FROM sessions WHERE ?', [{ api_id }]);
  }

  async updateLogSession(log_session, client_user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ log_session }, { client_user_id }]);
  }

  async updateSessionInfo(log_session, api_id, api_hash, client_user_id) {
    return this.sql.query('INSERT INTO sessions SET ?', [{
      log_session, api_id, api_hash, client_user_id,
    }]);
  }

  async updateAnswersToSession(answers, client_user_id) {
    return this.sql.query('UPDATE sessions SET ? WHERE ?', [{ answers }, { client_user_id }]);
  }

  async getAnswersFromSession(api_id) {
    return this.sql.query('SELECT answers FROM sessions WHERE ?', [{ api_id }]);
  }

  async getMainInfo(client_user_id) {
    return this.sql.query('SELECT api_id, api_hash, log_session FROM sessions WHERE ?', [{ client_user_id }]);
  }
}

export default new Session();

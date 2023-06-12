import pool from '../utils/MySQL';

class Stats {
  constructor() {
    this.sql = pool;
  }

  async addStats(
    users_count,
    reg_count,
    first_dep_count,
    api_id_client,
    incoming_messages_count,
    average_incoming_messages,
  ) {
    return this.sql.query('INSERT INTO stats SET ?', {
      users_count,
      reg_count,
      first_dep_count,
      api_id_client,
      incoming_messages_count,
      average_incoming_messages,
    });
  }

  async getClientStats(apiId) {
    return this.sql.query('SELECT * FROM stats WHERE ?', { api_id_client: apiId });
  }

  async getCountStats(apiId) {
    return this.sql.query('SELECT users_count FROM stats WHERE ?', { api_id_client: apiId });
  }

  async getRegStats(apiId) {
    return this.sql.query('SELECT reg_count FROM stats WHERE ?', { api_id_client: apiId });
  }

  async getDepStats(apiId) {
    return this.sql.query('SELECT first_dep_count FROM stats WHERE ?', { api_id_client: apiId });
  }

  async getIncomingMessagesStats(apiId) {
    return this.sql.query('SELECT incoming_messages_count FROM stats WHERE ?', { api_id_client: apiId });
  }

  async getAverageMessagesStats(apiId) {
    return this.sql.query('SELECT average_incoming_messages FROM stats WHERE ?', { api_id_client: apiId });
  }

  async updateClientStats(
    users_count,
    reg_count,
    first_dep_count,
    api_id_client,
    incoming_messages_count,
    average_incoming_messages,
  ) {
    return this.sql.query('UPDATE stats SET ? WHERE ?', [{
      users_count,
      reg_count,
      first_dep_count,
      incoming_messages_count,
      average_incoming_messages,
    }, { api_id_client }]);
  }
}
export default new Stats();

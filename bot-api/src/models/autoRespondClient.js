import pool from '../utils/MySQL';

class Clients {
  constructor() {
    this.sql = pool;
  }

  async addClient(user_id, username, phone_number) {
    return this.sql.query('INSERT INTO client_datas SET ?;', { user_id, username, phone_number });
  }

  async getClient(phone_number) {
    return this.sql.query('SELECT * FROM client_datas WHERE ?', [{ phone_number }]);
  }

  async setMainInfo(phone, hash, user_id, username) {
    return this.sql.query('INSERT INTO client_datas (phone_number, password, user_id, username) VALUES (?, ?, ?, ?)', [phone, hash, user_id, username]);
  }

  async getClientId(phone_number) {
    return this.sql.query('SELECT user_id FROM client_datas WHERE ?', [{ phone_number }]);
  }

  async updateClient(username, user_id) {
    return this.sql.query('UPDATE client_datas SET ? WHERE ?', [{ username }, { user_id }]);
  }
}

export default new Clients();

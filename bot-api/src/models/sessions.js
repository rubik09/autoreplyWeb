import pool from '../utils/MySQL';

class Session {
    constructor() {
        this.sql = pool;
    }

    async updateStatus(status, user_id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{status}, {user_id}]);
    }

    async getStatusById(id) {
        return this.sql.query('SELECT status FROM sessions WHERE ?', {id});
    }

    async checkByPhone(phone_number) {
        return this.sql.query('SELECT * FROM sessions WHERE ?', {phone_number});
    }

    async checkByUserId(user_id) {
        return this.sql.query('SELECT * FROM sessions WHERE ?', {user_id});
    }

    async checkByUsername(username) {
        return this.sql.query('SELECT * FROM sessions WHERE ?', {username});
    }

    async getSessions() {
        return this.sql.query('SELECT * FROM sessions');
    }

    async saveMainInfo(phone_number, user_id, username, region) {
        return this.sql.query('INSERT INTO sessions SET ?;', {
            phone_number, user_id, username, region,
        });
    }

    async updateLogSession(log_session, user_id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{log_session}, {user_id}]);
    }

    async updateSessionInfo(api_id, api_hash, user_id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{api_id, api_hash}, {user_id}]);
    }

    async updateKeywordsToSession(keywords, user_id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{keywords}, {user_id}]);
    }

    async updateKeywordsToSessionByApiId(keywords, api_id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{keywords}, {api_id}]);
    }

    async changeStatus(id, status) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{status}, {id}]);
    }

    async getKeywordsFromSession(api_id) {
        return this.sql.query('SELECT keywords FROM sessions WHERE ?', [{api_id}]);
    }

    async getUsernameFromSession(api_id) {
        return this.sql.query('SELECT username FROM sessions WHERE ?', [{api_id}]);
    }

    async getMainInfo(id) {
        return this.sql.query('SELECT api_id, api_hash, log_session, user_id FROM sessions WHERE ?', [{id}]);
    }

    async getMainInfoByUserId(user_id) {
        return this.sql.query('SELECT api_id, api_hash, log_session, user_id FROM sessions WHERE ?', [{user_id}]);
    }

    async deleteClient(id) {
        return this.sql.query('DELETE FROM sessions WHERE ?;', [{id}]);
    }

    async getPhoneById(user_id) {
        return this.sql.query('SELECT phone_number FROM sessions WHERE ?', [{user_id}]);
    }

    async getClientById(id) {
        return this.sql.query('SELECT * FROM sessions WHERE ?', [{id}]);
    }

    async updateClientById(keywords, region, username, id) {
        return this.sql.query('UPDATE sessions SET ? WHERE ?', [{keywords, region, username}, {id}]);
    }

    async getStatus() {
        return this.sql.query('SELECT api_id FROM sessions WHERE status=1;');
    }
}

export default new Session();

import pool from '../utils/MySQL';

class Stats {
    constructor() {
        this.sql = pool;
    }

    async addStats(incoming_messages_count, outgoing_messages_count, api_id_client) {
        return this.sql.query('INSERT INTO stats SET ?', {
            api_id_client,
            incoming_messages_count,
            outgoing_messages_count,
        });
    }

    async updateClientStats(incoming_messages_count, outgoing_messages_count, users_count, api_id_client) {
        return this.sql.query('UPDATE stats SET ? WHERE ?', [{
            incoming_messages_count, outgoing_messages_count, users_count,
        }, {api_id_client}]);
    }

    async updateIncomingMessagesCountToSessionByApiId(api_id_client) {
        return this.sql.query('UPDATE stats SET incoming_messages_count = incoming_messages_count + 1 WHERE ?', [{api_id_client}]);
    }

    async updateOutgoingMessagesCountToSessionByApiId(api_id_client) {
        return this.sql.query('UPDATE stats SET outgoing_messages_count = outgoing_messages_count + 1 WHERE ?', [{api_id_client}]);
    }

    async getStatsByApiId(api_id_client) {
        return this.sql.query('SELECT * FROM stats WHERE ?', [{api_id_client}]);
    }

    async getClientStats(api_id_client) {
        return this.sql.query('SELECT * FROM stats WHERE ?', [{ api_id_client }]);
    }

    async getCountStats(api_id_client) {
        return this.sql.query('SELECT users_count FROM stats WHERE ?', { api_id_client });
    }
}

export default new Stats();

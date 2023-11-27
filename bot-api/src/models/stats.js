import pool from '../utils/MySQL';

class Stats {
    constructor() {
        this.sql = pool;
    }

    async addStats(users_count, keywords, api_id_client, incoming_messages_count, average_incoming_messages) {
        return this.sql.query('INSERT INTO stats SET ?', {
            users_count,
            keywords,
            api_id_client,
            incoming_messages_count,
            average_incoming_messages
        });
    }

    async updateClientStats(users_count, keywords, api_id_client, incoming_messages_count, average_incoming_messages) {
        return this.sql.query('UPDATE stats SET ? WHERE ?', [{
            users_count,
            keywords,
            incoming_messages_count,
            average_incoming_messages
        }, {api_id_client}]);
    }

    async getClientStats(apiId) {
        return this.sql.query('SELECT * FROM stats WHERE ?', {api_id_client: apiId});
    }

    async getCountStats(apiId) {
        return this.sql.query('SELECT users_count FROM stats WHERE ?', {api_id_client: apiId});
    }

    async getIncomingMessagesStats(apiId) {
        return this.sql.query('SELECT incoming_messages_count FROM stats WHERE ?', {api_id_client: apiId});
    }

    async getKeywordsFromStats(apiId) {
        return this.sql.query('SELECT keywords FROM stats WHERE ?', [{api_id_client: apiId}]);
    }
}

export default new Stats();

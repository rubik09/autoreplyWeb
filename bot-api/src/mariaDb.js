import mariadb from 'mariadb';
import { databaseOptions } from './config';

let connection = null;
const pool = mariadb.createPool(databaseOptions);

export default {
  connect: async () => {
    connection = await pool.getConnection();
    console.log(`Connected to MySQL! id = ${connection.threadId}`);
  },
  getConnection: () => connection,
};

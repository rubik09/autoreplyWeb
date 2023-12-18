import util from 'util';
import mysql from 'mysql';
import {
  MYSQL_USER, MYSQL_DATABASE, MYSQL_ROOT_PASSWORD, MYSQL_PORT, DB_HOST,
} from '../config';

const pool = mysql.createPool({
  host: DB_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
  charset: 'utf8mb4',
  connectTimeout: 28800,
  interactiveTimeout:28800,
  waitTimeout: 28800,
  timezone: '+0000',
  queryTimeout: 60000,
});

pool.query = util.promisify(pool.query);
pool.queryRow = (...a) => pool.query(...a).then((r) => r[0]);

export default pool;

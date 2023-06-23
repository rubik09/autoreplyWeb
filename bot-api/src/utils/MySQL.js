import util from 'util';
import mysql from 'mysql';
import {
  MARIADB_USER, MARIADB_DATABASE, MARIADB_ROOT_PASSWORD,
  MARIADB_HOST, MARIADB_PORT,
} from '../config';

const pool = mysql.createPool({
  host: MARIADB_HOST,
  port: MARIADB_PORT,
  user: MARIADB_USER,
  password: MARIADB_ROOT_PASSWORD,
  database: MARIADB_DATABASE,
  charset: 'utf8mb4',
});

pool.query = util.promisify(pool.query);
pool.queryRow = (...a) => pool.query(...a).then((r) => r[0]);

export default pool;

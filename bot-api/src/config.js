export const {
  MYSQL_USER, MYSQL_DATABASE, MYSQL_ROOT_PASSWORD,
  MYSQL_HOST, MYSQL_PORT,
  SECRET_KEY,
} = process.env;

export const actionTypes = {
  REGISTRATION: 'register',
  DEPOSIT: 'firstDep',
};

export const databaseOptions = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
};

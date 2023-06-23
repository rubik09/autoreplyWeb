export const {
  MARIADB_USER,
  MARIADB_DATABASE,
  MARIADB_ROOT_PASSWORD,
  MARIADB_HOST,
  MARIADB_PORT,
  SECRET_KEY,
} = process.env;

export const actionTypes = {
  REGISTRATION: 'register',
  DEPOSIT: 'firstDep',
};

export const databaseOptions = {
  host: MARIADB_HOST,
  user: MARIADB_USER,
  port: MARIADB_PORT,
  password: MARIADB_ROOT_PASSWORD,
  database: MARIADB_DATABASE,
};

const isProduction = process.NODE_ENV === 'production';

export const MYSQL_HOST = isProduction ? process.env.MYSQL_HOST_PROD : process.env.MYSQL_HOST_DEV;
export const MYSQL_PORT = isProduction ? process.env.MYSQL_PORT_PROD : process.env.MYSQL_PORT_DEV;
export const MYSQL_DATABASE = isProduction ? process.env.MYSQL_DATABASE_PROD : process.env.MYSQL_DATABASE_DEV;
export const ADDRESS = isProduction ? process.env.ADDRESS_PROD : process.env.ADDRESS_DEV;


export const {
  MYSQL_USER, MYSQL_ROOT_PASSWORD,
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

export const {PORT} = process.env;

export const setupSteps = {
  firstStep: 1,
  secondStep: 2,
  thirdStep: 3
}

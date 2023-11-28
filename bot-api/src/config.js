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

export const {PORT, ADDRESS} = process.env;

export const setupSteps = {
  firstStep: 1,
  secondStep: 2,
  thirdStep: 3
}

export const tableLink = 'https://docs.google.com/spreadsheets/d/1edqh1hgFOf2DseMYI4aZftW3MVrifxkIyK_iXU-1Swc/edit?hl=ru#gid=0';
export const spreadsheetId = '1edqh1hgFOf2DseMYI4aZftW3MVrifxkIyK_iXU-1Swc';
export const sheetId = 0;

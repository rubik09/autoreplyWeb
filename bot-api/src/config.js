import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

export const {
  MYSQL_USER, MYSQL_DATABASE, MYSQL_ROOT_PASSWORD, MYSQL_PORT,
  SECRET_KEY,
} = process.env;

export const {PORT, ADDRESS} = process.env;

export const {TABLE_LINK, SPREADSHEET_ID, SHEET_ID} = process.env;

export const setupSteps = {
  firstStep: 1,
  secondStep: 2,
  thirdStep: 3
}

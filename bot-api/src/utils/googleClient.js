import { google } from 'googleapis';

export const auth = new google.auth.GoogleAuth({
    keyFile: 'src/utils/google.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const client = await auth.getClient();

// Instance of Google Sheets API
const googleSheets = google.sheets({ version: 'v4', auth: client });

export default googleSheets;

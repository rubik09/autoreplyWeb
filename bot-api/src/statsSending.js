import {SHEET_ID, SPREADSHEET_ID} from "./config.js";
import googleSheets from "./utils/googleClient.js";

const StatsSending = async (username, incomingMessagesStats, newUsersCount, averageMessagesCount, keywordsDiffArr, time, api_id) => {
    console.log({startTime: new Date(), keywords: keywordsDiffArr, username, api_id})
    try {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '.');
        const activityToInsert = [];
        const countToInsert = [];

        keywordsDiffArr.forEach((item) => {
            activityToInsert.push({
                userEnteredValue: {
                    stringValue: item.activity,
                },
            });

            countToInsert.push({
                userEnteredValue: {
                    numberValue: item.count,
                },
            });
        });


        const res = await googleSheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1:P',
        });
        const lastFilledCell = res.data.values.length
        await googleSheets.spreadsheets.batchUpdate({
                spreadsheetId: SPREADSHEET_ID,
                requestBody: {
                    requests: [{
                        updateCells: {
                            range: {
                                sheetId: SHEET_ID,
                                startRowIndex: lastFilledCell,
                                endRowIndex: lastFilledCell + 2,
                                startColumnIndex: 0,
                                endColumnIndex: 6 + keywordsDiffArr.length,
                            },
                            fields: 'userEnteredValue.numberValue',
                            rows: [
                                {
                                    values: [
                                        {},
                                        {},
                                        {},
                                        {},
                                        {},
                                        {},
                                        ...activityToInsert,
                                    ],
                                },
                                {
                                    values: [
                                        {
                                            userEnteredValue: {
                                                stringValue: formattedDate,
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: time,
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                stringValue: username,
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                numberValue: incomingMessagesStats,
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                numberValue: newUsersCount,
                                            },
                                        },
                                        {
                                            userEnteredValue: {
                                                numberValue: averageMessagesCount,
                                            },
                                        },
                                        ...countToInsert,
                                    ],
                                },
                            ],
                        },
                    }
                    ],
                },
            }
        );
    } catch
        (e) {
        console.log(e);
    }
    console.log({endTime: new Date(), username, api_id, keywords: keywordsDiffArr})
};

export default StatsSending;

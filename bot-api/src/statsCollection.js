import sessions from './models/sessions';
import stats from "./models/stats.js";
import user from './models/users';
import calculateDifference from "./utils/calculateDifference.js";
import cron from "node-cron";
import statsSending from "./statsSending.js";

const incomingMessages = async (client, event) => {
    client.floodSleepThreshold = 300;
    client.setParseMode('html');

    const {apiId} = client;
    const {userId, message} = event.originalUpdate;
    const keywords = await sessions.getKeywordsFromSession(apiId);
    const parsedKeywords = await JSON.parse(keywords[0].keywords);
    const chatId = await user.getUserId(apiId, userId.value);

    if (!chatId.length) await user.addUser(userId.value, apiId);

    const allUsers = await user.getCountUsers(apiId);
    const count = Object.values(allUsers[0])[0];

    await sessions.updateIncomingMessagesCountToSessionByApiId(apiId);

    const msgLowerCase = message.toLowerCase().trim();
    for (const [i, elem] of parsedKeywords.entries()) {
        const {
            keyword
        } = elem;

        if (!keyword) continue;

        const keywordLowerCase = keyword.toLowerCase().trim();

        if (keywordLowerCase !== msgLowerCase) continue;

        parsedKeywords[i].count++
    }
    const stringifyKeywords = JSON.stringify(parsedKeywords);

    if (keywords[0].keywords === stringifyKeywords) return;

    await sessions.updateKeywordsToSessionByApiId(stringifyKeywords, apiId);

    cron.schedule('0 0 * * *', async () => {
    const activeAccounts = await sessions.getStatus();

    for (const account of activeAccounts) {
        const {api_id} = account;
        let incomingMessages = await sessions.getIncomingMessagesCountToSessionByApiId(apiId);
        incomingMessages = incomingMessages[0].incoming_messages_count;
        const newKeywords = await sessions.getKeywordsFromSession(api_id);
        const newParsedKeywords = await JSON.parse(newKeywords[0].keywords);
        const statsArr = await stats.getClientStats(api_id);
        const username = await sessions.getUsername(api_id);

        if (!statsArr.length) {
            const averageMessagesCount = incomingMessages / (count ? count : 1);

            await statsSending(username, incomingMessages, count, averageMessagesCount, newParsedKeywords);
            await stats.addStats(count, newKeywords[0].keywords, api_id, incomingMessages, averageMessagesCount);
        } else {
            const oldKeywords = await stats.getKeywordsFromStats(api_id);
            const oldParsedKeywords = await JSON.parse(oldKeywords[0].keywords);
            const diffArr = calculateDifference(newParsedKeywords, oldParsedKeywords);
            const countUsers = await stats.getCountStats(api_id);
            const newUsersCount = count - countUsers[0].users_count;
            const incomingCount = await stats.getIncomingMessagesStats(api_id);
            const incomingMessagesStats = incomingMessages - Number(incomingCount[0].incoming_messages_count);
            const averageMessagesCount = incomingMessagesStats / (newUsersCount ? newUsersCount : 1);

            await statsSending(username, incomingMessagesStats, newUsersCount ? newUsersCount : 1, averageMessagesCount, diffArr);

            await stats.updateClientStats(newUsersCount ? newUsersCount : 1, newKeywords[0].keywords, api_id, incomingMessagesStats, averageMessagesCount);
        }
    }
    }, {
        scheduled: true,
        timezone: "Europe/Moscow"
    });
};

export default incomingMessages;

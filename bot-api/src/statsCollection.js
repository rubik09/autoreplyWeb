import sessions from './models/sessions';
import user from './models/users';
import stats from "./models/stats.js";

export const incomingMessages = async (client, event) => {
    client.floodSleepThreshold = 300;
    client.setParseMode('html');

    const {apiId} = client;
    const {userId} = event.originalUpdate;
    const chatId = await user.getUserId(apiId, userId.value);

    if (!chatId.length) await user.addUser(userId.value, apiId);

    const statsArr = await stats.getClientStats(apiId);

    if (!statsArr.length) await stats.addStats(0, apiId);

    await stats.updateIncomingMessagesCountToSessionByApiId(apiId);
};

export const outgoingMessages = async (client, event) => {
    client.floodSleepThreshold = 300;
    client.setParseMode('html');

    const {apiId} = client;
    const {message} = event.originalUpdate;
    const keywords = await sessions.getKeywordsFromSession(apiId);
    const parsedKeywords = await JSON.parse(keywords[0].keywords);

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
};

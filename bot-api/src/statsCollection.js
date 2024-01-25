import sessions from './models/sessions';
import user from './models/users';
import stats from "./models/stats.js";

export const incomingMessages = async (client, event) => {
    client.floodSleepThreshold = 300;
    client.setParseMode('html');

    const {className} = event.originalUpdate;
    if (className !== 'UpdateShortMessage') return;

    const {apiId} = client;
    const {userId} = event.originalUpdate;
    const chatId = await user.getUserId(apiId, userId?.value);

    if (!chatId.length) await user.addUser(userId?.value, apiId);

    const statsArr = await stats.getClientStats(apiId);

    if (!statsArr.length) await stats.addStats(0, apiId);

    await stats.updateIncomingMessagesCountToSessionByApiId(apiId);
};

export const outgoingMessages = async (client, event) => {
    client.floodSleepThreshold = 300;
    client.setParseMode('html');

    const {className} = event.originalUpdate;
    if (className !== 'UpdateShortMessage') return;

    const {apiId} = client;
    const {message} = event.originalUpdate;
    const keywords = await sessions.getKeywordsFromSession(apiId);
    const parsedKeywords = await JSON.parse(keywords[0].keywords);

    console.log(event.originalUpdate.userId.value)

    console.log(new Date())

    console.log(apiId, '***********', message, '************');

    const msgLowerCase = message.toLowerCase().trim();
    for (const [i, elem] of parsedKeywords.entries()) {
        const {
            keyword
        } = elem;

        console.log(keyword);

        if (!keyword) continue;

        const keywordsList = keyword.split(';');

        for (const item of keywordsList) {
            const keywordLowerCase = item.toLowerCase().trim();

            console.log(!(msgLowerCase.indexOf(keywordLowerCase) >= 0));

            if (!(msgLowerCase.indexOf(keywordLowerCase) >= 0)) continue;

            parsedKeywords[i].count++
        }
    }
    const stringifyKeywords = JSON.stringify(parsedKeywords);

    console.log('same', keywords[0].keywords === stringifyKeywords);

    if (keywords[0].keywords === stringifyKeywords) return;

    await sessions.updateKeywordsToSessionByApiId(stringifyKeywords, apiId);
};

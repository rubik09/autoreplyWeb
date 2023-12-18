import cron from "node-cron";
import sessions from "./models/sessions.js";
import statsSending from "./statsSending.js";
import zeroOutCounts from "./utils/zeroOutCounts.js";
import users from "./models/users.js";
import stats from "./models/stats.js";

const statsCalculating = () => {
    cron.schedule('0 0 * * *', async () => {
        const activeAccounts = await sessions.getStatus();

        for (const account of activeAccounts) {
            const {api_id} = account;
            const statsArr = await stats.getClientStats(api_id);
            if (!statsArr.length) await stats.addStats(0, api_id);
            const allUsers = await users.getCountUsers(api_id);
            const count = Object.values(allUsers[0])[0];
            const countUsers = await stats.getCountStats(api_id);
            const newUsersCount = count - countUsers[0].users_count;
            const mainStats = await stats.getStatsByApiId(api_id);
            const {incoming_messages_count} = mainStats[0];
            const keywords = await sessions.getKeywordsFromSession(api_id);
            const parsedKeywords = JSON.parse(keywords[0].keywords);
            const username = await sessions.getUsernameFromSession(api_id);
            let averageMessagesCount = incoming_messages_count / newUsersCount;
            if (incoming_messages_count < 1 || newUsersCount < 1) averageMessagesCount = 0;

            await statsSending(username[0].username, incoming_messages_count, newUsersCount, averageMessagesCount, parsedKeywords);

            const newArr = zeroOutCounts(parsedKeywords);
            const stringifyNewArr = JSON.stringify(newArr);

            await sessions.updateKeywordsToSessionByApiId(stringifyNewArr, api_id);
            await stats.updateClientStats(0, count[0], api_id);
            await users.cleanTable();
        }
    }, {
        scheduled: true,
        timezone: "Europe/Moscow"
    });
};

export default statsCalculating;

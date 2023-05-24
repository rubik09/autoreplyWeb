import user from './models/users';
import sessions from './models/sessions';
import stats from './models/stats';
import { actionTypes } from './config';
import sendMessages from './utils/sendMessages';

async function eventPrint(client, event) {
  client.floodSleepThreshold = 300;
  client.setParseMode('html');

  const { apiId } = client;
  const messageEvent = event.message;
  const { userId, message } = event.originalUpdate;

  const chatId = await user.getUserId(apiId, userId);
  const clientUserId = await sessions.getClientUserId(apiId);
  const sender = await messageEvent.getSender();

  if (userId) {
    if (!chatId.length && Number(userId) !== clientUserId[0].client_user_id) {
      const answer = await sessions.getAnswersFromSession(apiId);
      const result = await JSON.parse(answer[0].answers);
      const { messages } = result.stages[0];

      if (messages) {
        await client.markAsRead(sender, messageEvent);
        await sendMessages(sender, client, messages);
      }

      await user.addUser(userId, apiId, answer[0].answers);
    } else {
      const autoAnswers = await user.getAnswers(apiId, userId);
      const parsedAutoAnswers = await JSON.parse(autoAnswers[0].answers);
      if (parsedAutoAnswers.stages.length > 1) {
        const msgLowerCase = message.toLowerCase();
        for (const [i, stage] of parsedAutoAnswers.stages.entries()) {
          const {
            keyWords, isClient, messages, stageMode,
          } = stage;

          if (!keyWords) continue;

          if (!keyWords.includes(msgLowerCase.trim()) || stageMode) continue;

          if (
            isClient && Number(messageEvent.fromId.userId)
              !== Number(clientUserId[0].client_user_id)
          ) {
            continue;
          }

          if (messages) {
            await client.markAsRead(sender, messageEvent);
            await sendMessages(sender, client, messages);
          }

          parsedAutoAnswers.stages[i].stageMode = true;
          await user.updateStageStatus(
            JSON.stringify(parsedAutoAnswers),
            Number(messageEvent.peerId.userId).toString(),
          );
        }
      }
    }
  } else if (Number(messageEvent.peerId.userId) === 6012459456) {
    if (messageEvent.message === '/stop') {
      const clientId = await sessions.getClientUserId(apiId);
      await sessions.updateStatus(false, clientId[0].client_user_id);
      await client.destroy();
    }
    if (messageEvent.message === '/stats') {
      const allUsers = await user.getCountUsers(apiId);
      const count = Object.values(allUsers[0]);
      const answers = await user.getAnswersCount(apiId);
      let registrationCount = 0;
      let firstDepositCount = 0;
      for (const autoAnswer of answers) {
        const parsedAutoAnswers = await JSON.parse(autoAnswer.answers);
        for (const stage of parsedAutoAnswers.stages) {
          const { stageMode, action } = stage;
          if (stageMode && action === actionTypes.REGISTRATION) {
            registrationCount += 1;
          }
          if (stageMode && action === actionTypes.DEPOSIT) {
            firstDepositCount += 1;
          }
        }
      }
      const clientStats = await stats.getClientStats(apiId);
      if (!clientStats.length) {
        await stats.addStats(count, registrationCount, firstDepositCount, apiId);
      } else {
        await stats.updateClientStats(count[0], registrationCount, firstDepositCount, apiId);
      }
    }
  }
}

export default eventPrint;

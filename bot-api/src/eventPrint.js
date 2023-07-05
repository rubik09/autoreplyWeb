import user from './models/users';
import sessions from './models/sessions';
import sendMessages from './utils/sendMessages';

async function incomingMessages(client, event) {
  client.floodSleepThreshold = 300;
  client.setParseMode('html');
  const { apiId } = client;

  const { className } = event.originalUpdate;
  if (className === 'UpdateShortMessage') {
    const messageEvent = event.message;
    const { userId, message } = event.originalUpdate;
    // const status = await sessions.getStatus(apiId);
    const chatId = await user.getUserId(apiId, userId);
    const sender = await messageEvent.getSender();

    // if (!status[0].status) return;

    if (!chatId.length) {
      const answer = await sessions.getAnswersFromSession(apiId);
      const result = await JSON.parse(answer[0].answers);
      const { messages } = result.stages[0];
      if (messages) {
        await client.markAsRead(sender, messageEvent);
        await sendMessages(sender, client, messages);
      }
      await user.addUser(userId, apiId, answer[0].answers, 1);
    } else {
      const autoAnswers = await user.getAnswers(apiId, userId);
      const parsedAutoAnswers = await JSON.parse(autoAnswers[0].answers);
      const incomingMessagesCount = await user.getIncomingMessagesUserCount(apiId, userId);

      await user.updateIncomingMessagesCount(
        Number(incomingMessagesCount[0].incoming_messages_count) + 1,
        userId,
        apiId,
      );

      if (parsedAutoAnswers.stages.length > 1) {
        const msgLowerCase = message.toLowerCase();
        for (const [i, stage] of parsedAutoAnswers.stages.entries()) {
          const {
            keyWords, isClient, messages, stageMode,
          } = stage;

          if (!keyWords) continue;

          if (!keyWords.includes(msgLowerCase.trim()) || stageMode) continue;

          if (isClient) continue;

          if (messages) {
            await client.markAsRead(sender, messageEvent);
            await sendMessages(sender, client, messages);
          }

          parsedAutoAnswers.stages[i].stageMode = true;
          await user.updateStageStatus(JSON.stringify(parsedAutoAnswers), userId);
        }
      }
    }
  }
}

export default incomingMessages;

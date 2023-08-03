import user from './models/users';
import sendMessages from './utils/sendMessages';

async function outGoingMessages(client, event) {
  client.setParseMode('html');
  const { apiId } = client;

  const { className } = event.originalUpdate;
  const { userId, message } = event.originalUpdate;
  const messageEvent = event.message;

  if (className === 'UpdateShortMessage') {
    const autoAnswers = await user.getAnswers(apiId, userId);
    if (autoAnswers.length) {
      const parsedAutoAnswers = await JSON.parse(autoAnswers[0].answers);
      const messageToLowerCase = message.toLowerCase();
      for (const [i, stage] of parsedAutoAnswers.stages.entries()) {
        const {
          keyWords, isClient, messages, stageMode,
        } = stage;

        if (!keyWords) continue;

        if (!isClient) continue;

        if (!keyWords.includes(messageToLowerCase.trim()) || stageMode) continue;

        if (messages) {
          await client.markAsRead(userId, messageEvent);
          await sendMessages(userId, client, messages);
        }

        parsedAutoAnswers.stages[i].stageMode = true;
        await user.updateStageStatus(JSON.stringify(parsedAutoAnswers), userId, apiId);
      }
    }
  }
}

export default outGoingMessages;

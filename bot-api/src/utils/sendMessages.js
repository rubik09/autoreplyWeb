import setTypingDelay from './setTypingDelay';

async function sendMessages(chatId, client, messages) {
  const lastSchedule = messages[messages.length - 1].schedule;

  for (const item of messages) {
    await client.sendMessage(
      chatId,
      { message: item.message, schedule: +item.schedule + (Date.now() / 1000) },
    );
  }

  await setTypingDelay(client, chatId, +lastSchedule);
}

export default sendMessages;

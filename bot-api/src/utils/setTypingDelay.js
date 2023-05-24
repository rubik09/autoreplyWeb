import clientInvoke from './clientSetTyping';

async function setTypingDelay(client, chatId, schedule) {
  const interval = setInterval(async () => {
    await clientInvoke(client, chatId);
  }, 2000);

  setTimeout(() => {
    clearInterval(interval);
  }, schedule * 1000);
}

export default setTypingDelay;

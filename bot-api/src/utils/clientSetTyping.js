import { Api } from 'telegram';

async function setTyping(client, chatId) {
  await client.invoke(
    new Api.messages.SetTyping({
      peer: chatId,
      action: new Api.SendMessageTypingAction({}),
      topMsgId: 43,
    }),
  );
}

export default setTyping;

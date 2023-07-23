import { Logger } from 'telegram';
import firstInit from './firstInit';

export default class NewLogger extends Logger {
  info(message) {
    if (message === 'The server closed the connection') {
      firstInit();
    }
  }
}

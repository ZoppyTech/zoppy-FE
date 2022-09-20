import { ChatContact } from './chat-contact';
import { ChatManager } from './chat-manager';
import { ThreadMessage } from './thread-message';

export class ChatRoom {
    public manager: ChatManager = new ChatManager();
    public contact: ChatContact = new ChatContact();
    public threads: Array<ThreadMessage> = [];
}

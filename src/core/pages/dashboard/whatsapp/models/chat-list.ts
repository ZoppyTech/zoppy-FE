import { ChatContact } from './chat-contact';
import { ChatManager } from './chat-manager';
import { ThreadMessage } from './thread-message';

export class ChatList {
    public declare manager: ChatManager;
    public declare contact: ChatContact;
    public declare lastMessage: ThreadMessage;
}

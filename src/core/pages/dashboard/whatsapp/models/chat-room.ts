import { ChatAccount } from './chat-account';
import { ChatContact } from './chat-contact';
import { ChatManager } from './chat-manager';
import { ThreadMessage } from './thread-message';

export class ChatRoom {
    public account: ChatAccount = new ChatAccount();
    public manager: ChatManager = new ChatManager();
    public contact: ChatContact = new ChatContact();
    public supportName: string | null = null;
    public threads: Array<ThreadMessage> = [];
    public unreadThreads: Array<ThreadMessage> = [];
    public actived: boolean = false;
}

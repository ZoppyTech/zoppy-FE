import { DateUtil, WhatsappConstants } from '@ZoppyTech/utilities';
import { ChatContact } from './chat-contact';
import { ChatManager } from './chat-manager';
import { ThreadMessage } from './thread-message';

export class ChatRoom {
    public declare id: string;
    public declare ticket: string;
    public declare sessionExpiration: string | null;
    public declare createdAt: Date;
    public declare finishedAt: Date;
    public declare companyId: string;
    public manager: ChatManager | null = null;
    public contact: ChatContact = new ChatContact();
    public threads: Array<ThreadMessage> = [];
    public unreadThreads: Array<ThreadMessage> = [];
    public actived: boolean = false;

    public addThread(thread: ThreadMessage): Array<ThreadMessage> {
        this.threads.push(thread);
        return this.threads;
    }

    public clearSession(): void {
        this.sessionExpiration = null;
    }

    public getUnreadThreads(): Array<ThreadMessage> {
        return this.threads.filter((thread: ThreadMessage) => {
            return thread.type !== WhatsappConstants.MessageType.Template && thread.readByManager === false;
        });
    }

    public findThreadById(messageId: string): ThreadMessage | undefined {
        return this.threads.find((thread: ThreadMessage) => thread.id === messageId);
    }

    public removeThreadById(id: string): boolean {
        const threadIndex: number = this.threads.findIndex((thread: ThreadMessage) => thread.id === id);
        if (threadIndex === -1) return false;
        return this.threads.splice(threadIndex, 1).length > 0;
    }

    public setActive(value: boolean = true): void {
        this.actived = value;
    }

    public setFirstMessagesOfDay(): void {
        if (this.threads.length <= 0) return;
        const firstMessage: ThreadMessage = this.threads[0];
        firstMessage.isFirstMessageOfDay = true;
        let firstMessageDate: Date = new Date(firstMessage.createdAt);
        for (const thread of this.threads) {
            if (!DateUtil.differenceInCalendarDays(new Date(thread.createdAt), firstMessageDate)) continue;
            thread.isFirstMessageOfDay = true;
            firstMessageDate = new Date(thread.createdAt);
        }
    }

    // public updateUnreadMessages(): void {
    //     const unreadThreads: ThreadMessage[] = this.getUnreadThreads();
    //     for (const unreadThread of unreadThreads) {
    //         const threadIndex: number = this.threads.findIndex((thread: ThreadMessage) => thread.id === unreadThread.id);
    //         if (threadIndex === -1) continue;
    //         this.threads[threadIndex].readByManager = true;
    //     }
    // }
}

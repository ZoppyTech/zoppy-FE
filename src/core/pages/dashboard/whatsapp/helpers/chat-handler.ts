import { BehaviorSubject } from 'rxjs';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { ChatRoom } from '../models/chat-room';
import { ThreadMessage } from '../models/thread-message';
import { WhatsappComponent } from '../whatsapp.component';
import { ChatSocketData } from '../models/chat-socket-data';
import { WebSocketConstants } from '@ZoppyTech/utilities';
import { ChatFilters } from '../models/chat-filters';
import { ChatAccount } from '../models/chat-account';
import { ChatManager } from '../models/chat-manager';

export class ChatHandler {
    protected component: WhatsappComponent;

    public static create(component: WhatsappComponent): ChatHandler {
        return new ChatHandler(component);
    }

    public get account(): ChatAccount {
        return this.component.account;
    }

    public get rootManager(): ChatManager {
        return this.component.manager;
    }

    public fillRooms(conversations: WhatsappConversationEntity[]): void {
        this.component.rooms = this.component.chatMapper.mapRooms(conversations);
    }

    private constructor(component: WhatsappComponent) {
        this.component = component;
    }

    public toArray(): Array<[string, ChatRoom]> {
        return Array.from(this.component.rooms.entries());
    }

    public addRoom(conversation: WhatsappConversationEntity): ChatRoom {
        const newRoom: ChatRoom = this.component.chatMapper.mapRoom(conversation);
        this.component.rooms.set(conversation.wppContactId, newRoom);
        this.updateChatList();
        return newRoom;
    }

    public removeRoom(contactId: string): void {
        this.component.rooms.delete(contactId);
        this.component.roomSelected = new ChatRoom();
        this.component.isChatRoomVisible = false;
        this.updateChatList();
    }

    public sortRoomsByMostRecentMessages(): void {
        const rooms: Array<[string, ChatRoom]> = this.toArray();
        if (rooms.length <= 1) {
            return;
        }

        const orderedRooms: Array<[string, ChatRoom]> = rooms.sort((a: [string, ChatRoom], b: [string, ChatRoom]) => {
            const leftDate: Date = new Date(a[1].threads[a[1].threads.length - 1].createdAt);
            const rightDate: Date = new Date(b[1].threads[b[1].threads.length - 1].createdAt);
            if (leftDate.getTime() - rightDate.getTime() === 0) return 0;
            else if (leftDate.getTime() - rightDate.getTime() > 0) return -1;
            else return 1;
        });
        this.component.rooms = new Map(orderedRooms);
    }

    public setRoomAsMostRecent(room: ChatRoom): void {
        this.component.rooms.delete(room.contact.id);
        const sortByMostRecent: Array<[string, ChatRoom]> = this.toArray();
        sortByMostRecent.unshift([room.contact.id, room]);
        this.component.rooms = new Map(sortByMostRecent);
    }

    public updateChatList(): void {
        this.component.rooms = new Map(this.component.rooms.entries());
    }

    public updateUnreadMessages(room: ChatRoom): void {
        const unreadMessages: ThreadMessage[] = room.getUnreadThreads();
        for (const unreadMessage of unreadMessages) {
            unreadMessage.readByManager = true;
            const socketData: ChatSocketData = { action: 'update', message: new WhatsappMessageEntity() };
            socketData.message.id = unreadMessage.id;
            socketData.message.userId = this.component.user.id;
            this.component.webSocketService.emit(WebSocketConstants.CHAT_EVENTS.UPDATE, socketData);
        }
    }
}

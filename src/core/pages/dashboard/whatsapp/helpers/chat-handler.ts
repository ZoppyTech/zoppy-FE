import { WebSocketConstants } from '@ZoppyTech/utilities';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { ChatAccount } from '../models/chat-account';
import { ChatManager } from '../models/chat-manager';
import { ChatRoom } from '../models/chat-room';
import { ChatSocketData } from '../models/chat-socket-data';
import { ThreadMessage } from '../models/thread-message';
import { WhatsappComponent } from '../whatsapp.component';

export class ChatHandler {
    protected component: WhatsappComponent;

    public static create(component: WhatsappComponent): ChatHandler {
        return new ChatHandler(component);
    }

    public get isAdmin(): boolean {
        return this.component.isAdmin;
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

    public addRoom(conversation: WhatsappConversationEntity, overwrite: boolean = false): ChatRoom {
        const roomExists: boolean = this.component.rooms.has(conversation.wppContactId);
        if (roomExists && !overwrite) {
            const targetRoom: ChatRoom = this.component.rooms.get(conversation.wppContactId) ?? new ChatRoom();
            if (targetRoom.threads.length > 0) return targetRoom;
        }
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

    public updateRoomManager(room: ChatRoom): void {
        const socketData: ChatSocketData = {
            action: 'get_room_manager',
            message: {
                wppContactId: room.contact.id,
                wppManagerId: room.manager?.id,
                userId: this.component.user.id,
                companyId: room.companyId
            } as any
        };
        this.component.webSocketService.emit('update_room_manager', socketData);
    }

    public updateNewConversationCount(): void {
        const socketData: ChatSocketData = {
            action: 'new_conversation_count',
            message: { companyId: this.account.companyId } as WhatsappMessageEntity
        };
        this.component.webSocketService.emit('update_new_conversation_count', socketData);
    }

    public updateFinishedConversation(contactId: string): void {
        const socketData: ChatSocketData = {
            action: 'finished_conversation',
            message: { wppContactId: contactId, companyId: this.account.companyId } as WhatsappMessageEntity
        };
        this.component.webSocketService.emit('update_finished_conversation', socketData);
    }

    public updateChatTransfer(room: ChatRoom): void {
        const socketData: ChatSocketData = {
            action: 'chat_transfer',
            message: {
                wppContactId: room.contact.id,
                wppManagerId: room.manager?.id,
                userId: this.component.user.id,
                companyId: room.companyId
            } as any
        };
        this.component.webSocketService.emit('update_chat_transfer', socketData);
    }
}

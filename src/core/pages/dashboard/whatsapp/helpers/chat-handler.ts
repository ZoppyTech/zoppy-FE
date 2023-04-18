import { DateUtil, WhatsappConstants } from '@ZoppyTech/utilities';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappComponent } from '../whatsapp.component';
import { ChatRoom } from '../models/chat-room';
import { BehaviorSubject } from 'rxjs';

export class ChatHandler {
    protected component: WhatsappComponent;

    public static create(component: WhatsappComponent): ChatHandler {
        debugger;
        return new ChatHandler(component);
    }

    public get rooms(): Map<string, ChatRoom> {
        return this.component.rooms;
    }

    public set rooms(rooms: Map<string, ChatRoom>) {
        this.component.rooms = rooms;
    }

    public fillRooms(conversations: WhatsappConversationEntity[]): void {
        debugger;
        this.component.rooms = this.component.chatMapper.mapRooms(conversations);
    }

    private constructor(component: WhatsappComponent) {
        this.component = component;
    }

    public toArray(): Array<[string, ChatRoom]> {
        debugger;
        return Array.from(this.component.rooms.entries());
    }

    public addRoom(conversation: WhatsappConversationEntity): ChatRoom {
        return new ChatRoom();
    }

    public removeRoom(contactId: string): void {
        this.component.rooms.delete(contactId);
        this.component.roomSelected = new ChatRoom();
        this.component.isChatRoomVisible$ = new BehaviorSubject(false);
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
}

import { StringUtil, WhatsappConstants } from '@ZoppyTech/utilities';
import { Injectable } from '@angular/core';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMediaMessageEntity } from 'src/shared/models/entities/whatsapp-media-message.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { WhatsappUtil } from '../utils/whatsapp.util';
import { ChatRoom } from '../models/chat-room';
import { ChatManager } from '../models/chat-manager';
import { ChatContact } from '../models/chat-contact';
import { ThreadMediaMessage, ThreadMessage } from '../models/thread-message';

@Injectable({
    providedIn: 'root'
})
export class ChatMapper {
    public SYSTEM_LABEL: string = 'Sistema';
    public NO_NAME_USER: string = 'Cliente';

    public mapRooms(rooms: WhatsappConversationEntity[] = []): Map<string, ChatRoom> {
        if (!rooms || rooms.length <= 0) return new Map<string, ChatRoom>();
        const mappedRooms: Map<string, ChatRoom> = new Map();
        for (const room of rooms) {
            const newRoom: ChatRoom = this.mapRoom(room);
            mappedRooms.set(room.wppContactId, newRoom);
        }
        return mappedRooms;
    }

    public mapRoom(conversationEntity: WhatsappConversationEntity): ChatRoom {
        const room: ChatRoom = new ChatRoom();
        room.id = conversationEntity.id;
        room.ticket = conversationEntity.ticket;
        room.sessionExpiration = conversationEntity.sessionExpiration;
        room.createdAt = conversationEntity.createdAt;
        room.finishedAt = conversationEntity.finishedAt;
        room.companyId = conversationEntity.companyId;
        room.manager = this.mapManager(conversationEntity.manager);
        room.contact = this.mapContact(conversationEntity.contact);
        room.threads = this.mapMessages(conversationEntity.messages);
        room.unreadThreads = [];
        room.actived = false;
        room.setFirstMessagesOfDay();
        return room;
    }

    public mapManager(managerEntity: WhatsappAccountManagerEntity | null): ChatManager | null {
        if (!managerEntity) return null;
        const manager: ChatManager = new ChatManager();
        manager.id = managerEntity.id;
        manager.name = managerEntity.user.name;
        manager.wppPhoneNumberId = managerEntity.wppPhoneNumberId;
        manager.wppAccountId = managerEntity.wppAccountId;
        return manager;
    }

    public mapContact(contactEntity: WhatsappContactEntity): ChatContact {
        const contact: ChatContact = new ChatContact();
        contact.id = contactEntity.id;
        contact.firstName = contactEntity.firstName;
        contact.lastName = contactEntity.lastName;
        contact.displayName = StringUtil.buildFullName(contactEntity.firstName, contactEntity.lastName);
        contact.displayPhone = WhatsappUtil.formatDisplayPhone(
            contactEntity.countryCode,
            contactEntity.subdivisionCode,
            contactEntity.phone
        );
        contact.hasIndex = false;
        contact.isBlocked = contactEntity.isBlocked;
        contact.createdAt = contactEntity.createdAt;
        contact.companyId = contactEntity.companyId;
        return contact;
    }

    public mapMessages(messageEntities: WhatsappMessageEntity[]): ThreadMessage[] {
        return messageEntities.map((messageEntity: WhatsappMessageEntity) => {
            return this.mapMessage(messageEntity);
        });
    }

    public mapMessage(messageEntity: WhatsappMessageEntity): ThreadMessage {
        const thread: ThreadMessage = new ThreadMessage();
        thread.id = messageEntity.id;
        thread.type = messageEntity.type;
        thread.templateName = undefined;
        thread.content = messageEntity.content;
        thread.status = messageEntity.status;
        thread.isBusiness = messageEntity.origin === WhatsappConstants.MessageOrigin.BusinessInitiated;
        thread.readByManager = thread.isBusiness || !!messageEntity.wppManagerId;
        thread.senderName = this.tryBuildSenderNameFrom(messageEntity);
        thread.isFirstMessageOfDay = false;
        thread.companyId = messageEntity.companyId;
        thread.createdAt = messageEntity.createdAt;
        thread.deletedAt = messageEntity.deletedAt;
        thread.media = this.mapMedia(messageEntity.media);
        return thread;
    }

    public mapMedia(mediaEntity: WhatsappMediaMessageEntity): ThreadMediaMessage | null {
        if (!mediaEntity) return null;
        const media: ThreadMediaMessage = new ThreadMediaMessage();
        media.id = mediaEntity.id;
        media.url = mediaEntity.url;
        media.caption = mediaEntity.caption;
        media.mimeType = mediaEntity.mimeType;
        media.fileSize = mediaEntity.fileSize;
        return media;
    }

    public tryBuildSenderNameFrom(messageEntity: WhatsappMessageEntity): string {
        const isBusiness: boolean = messageEntity.origin === WhatsappConstants.MessageOrigin.BusinessInitiated;
        if (isBusiness) {
            return messageEntity.manager?.user.name ?? this.SYSTEM_LABEL;
        }

        const contactName: string | undefined = messageEntity.contact?.firstName.trim();
        if (!!contactName) {
            return contactName;
        }

        if (!!messageEntity.contact?.phone) {
            return WhatsappUtil.slicePhone(messageEntity.contact?.phone).getFullPhone();
        }

        return this.NO_NAME_USER;
    }
}

import { DateUtil, StringUtil, WhatsappConstants } from '@ZoppyTech/utilities';
import { Injectable } from '@angular/core';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMediaMessageEntity } from 'src/shared/models/entities/whatsapp-media-message.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { WppContact, WppConversation, WppManager, WppMediaMessage, WppMessage } from '../models/wpp-conversation';
import { WhatsappUtil } from '../utils/whatsapp.util';

//TODO: Use this class as Service, after remove WhatsappMapper class
//Essa classe sera uma melhoria futura do chat - NAO DELETAR!
@Injectable({
    providedIn: 'root'
})
export class ChatMapper {
    public mapConversations(conversations: WhatsappConversationEntity[] = []): Map<string, WppConversation> {
        if (!conversations || conversations.length <= 0) return new Map<string, WppConversation>();
        const conversationsMapped: Map<string, WppConversation> = new Map();
        for (const conversation of conversations) {
            conversationsMapped.set(conversation.wppContactId, this.mapConversation(conversation));
        }
        return conversationsMapped;
    }

    public mapConversation(conversationEntity: WhatsappConversationEntity): WppConversation {
        const conversation: WppConversation = {
            ticket: conversationEntity.ticket,
            sessionExpiration: conversationEntity.sessionExpiration,
            finishedAt: conversationEntity.finishedAt,
            companyId: conversationEntity.companyId,
            manager: this.mapManager(conversationEntity.wppAccountManager),
            contact: this.mapContact(conversationEntity.wppContact),
            threads: this.mapMessages(conversationEntity.messages),
            unreadThreads: [],
            actived: false
        };
        this.setFirstMessagesOfDay(conversation.threads);
        return conversation;
    }

    public mapManager(managerEntity: WhatsappAccountManagerEntity): WppManager | null {
        if (managerEntity === null) return managerEntity;
        return {
            id: managerEntity.id,
            name: managerEntity.user.name,
            wppPhoneNumberId: managerEntity.wppPhoneNumberId,
            wppAccountId: managerEntity.wppAccountId
        };
    }

    public mapContact(contactEntity: WhatsappContactEntity): WppContact {
        return {
            id: contactEntity.id,
            firstName: contactEntity.firstName,
            lastName: contactEntity.lastName,
            displayName: StringUtil.buildFullName(contactEntity.firstName, contactEntity.lastName),
            displayPhone: WhatsappUtil.formatDisplayPhone(contactEntity.countryCode, contactEntity.subdivisionCode, contactEntity.phone),
            hasIndex: false,
            isBlocked: contactEntity.isBlocked,
            createdAt: contactEntity.createdAt,
            companyId: contactEntity.companyId
        };
    }

    public mapMessages(messageEntities: WhatsappMessageEntity[]): WppMessage[] {
        return messageEntities.map((messageEntity: WhatsappMessageEntity) => {
            return this.mapMessage(messageEntity);
        });
    }

    public mapMessage(messageEntity: WhatsappMessageEntity): WppMessage {
        const isBusiness: boolean = messageEntity.origin === WhatsappConstants.MessageOrigin.BusinessInitiated;
        return {
            id: messageEntity.id,
            type: messageEntity.type,
            templateName: undefined,
            content: messageEntity.content,
            status: messageEntity.status,
            isBusiness: isBusiness,
            readByManager: isBusiness || !!messageEntity.wppManagerId,
            isFirstMessageOfDay: false,
            wamId: messageEntity.wamId,
            companyId: messageEntity.companyId,
            createdAt: messageEntity.createdAt,
            updatedAt: messageEntity.updatedAt,
            deletedAt: messageEntity.deletedAt,
            media: this.mapMedia(messageEntity.wppMediaMessage)
        };
    }

    public mapMedia(mediaEntity: WhatsappMediaMessageEntity | undefined): WppMediaMessage | undefined {
        if (mediaEntity == undefined) return undefined;
        return {
            ...mediaEntity
        };
    }

    public setFirstMessagesOfDay(threads: Array<WppMessage>): void {
        if (threads.length <= 0) return;
        const firstMessage: WppMessage = threads[0];
        firstMessage.isFirstMessageOfDay = true;
        let firstMessageDate: Date = new Date(firstMessage.createdAt);
        for (const thread of threads) {
            if (!DateUtil.differenceInCalendarDays(new Date(thread.createdAt), firstMessageDate)) continue;
            thread.isFirstMessageOfDay = true;
            firstMessageDate = new Date(thread.createdAt);
        }
    }
}

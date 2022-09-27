import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { DateUtil } from 'src/shared/utils/date.util';
import { ChatAccount } from './models/chat-account';
import { ChatContact } from './models/chat-contact';
import { ChatManager } from './models/chat-manager';
import { ChatRoom } from './models/chat-room';
import { ThreadMessage } from './models/thread-message';
import { WhatsappUtil } from './utils/whatsapp.util';

export class WhatsappMapper {
    public static mapConversations(
        account: ChatAccount,
        manager: ChatManager,
        messages: WhatsappMessageEntity[] = []
    ): Map<string, ChatRoom> {
        if (!manager || messages.length <= 0) new Map();
        const whatsappConversations: Map<string, ChatRoom> = new Map<string, ChatRoom>();
        for (let conversation of this.groupConversationsByContact(messages).entries()) {
            const chatRoom: ChatRoom = new ChatRoom();
            chatRoom.account = account;
            chatRoom.manager = manager;
            chatRoom.threads = conversation[1];
            const contact: ChatContact | undefined = this.mapContactFromMessages(conversation[0], messages);
            if (!contact) continue;
            chatRoom.contact = contact;
            whatsappConversations.set(conversation[0], chatRoom);
            this.setFirstMessagesOfDay(chatRoom.threads);
        }
        return whatsappConversations;
    }

    public static groupConversationsByContact(messages: WhatsappMessageEntity[]): Map<string, Array<ThreadMessage>> {
        const conversationsFromContact: Map<string, Array<ThreadMessage>> = new Map();
        for (const message of messages) {
            if (conversationsFromContact.has(message.wppContactId)) {
                const messages: ThreadMessage[] | undefined = conversationsFromContact.get(message.wppContactId);
                messages?.splice(0, 0, this.mapMessage(message));
                conversationsFromContact.set(message.wppContactId, messages ?? []);
                continue;
            }
            conversationsFromContact.set(message.wppContactId, [this.mapMessage(message)]);
        }
        return conversationsFromContact;
    }

    public static mapContactFromMessages(contactId: string, messages: WhatsappMessageEntity[]): ChatContact | undefined {
        const firstMessageFromContact: WhatsappMessageEntity | undefined = messages.find((message: WhatsappMessageEntity) => {
            return message.wppContactId === contactId;
        });
        if (!firstMessageFromContact || !firstMessageFromContact.wppContact) {
            return undefined;
        }
        return this.mapContact(firstMessageFromContact.wppContact);
    }

    public static mapMessage(messageEntity: WhatsappMessageEntity): ThreadMessage {
        const threadMessage: ThreadMessage = new ThreadMessage();
        threadMessage.id = messageEntity.id;
        threadMessage.type = messageEntity.type;
        threadMessage.content = messageEntity.content;
        threadMessage.status = messageEntity.status;
        threadMessage.isBusiness = messageEntity.origin === WhatsappConstants.MessageOrigin.BusinessInitiated;
        threadMessage.isFirstMessageOfDay = false;
        threadMessage.wamId = messageEntity.wamId;
        threadMessage.createdAt = messageEntity.createdAt;
        threadMessage.deletedAt = messageEntity.deletedAt;
        return threadMessage;
    }

    public static mapContact(contactEntity: WhatsappContactEntity): ChatContact {
        const contact: ChatContact = new ChatContact();
        contact.id = contactEntity.id;
        contact.name = contactEntity.name;
        contact.displayPhone = WhatsappUtil.formatDisplayPhone(
            contactEntity.countryCode,
            contactEntity.subdivisionCode,
            contactEntity.phoneNumber
        );
        contact.isBlocked = contactEntity.isBlocked;
        contact.hasIndex = false;
        contact.createdAt = contactEntity.createdAt;
        contact.companyId = contactEntity.companyId;
        return contact;
    }

    public static setFirstMessagesOfDay(threads: Array<ThreadMessage>): void {
        if (threads.length <= 0) return;
        const firstMessage: ThreadMessage = threads[0];
        firstMessage.isFirstMessageOfDay = true;
        let firstMessageDate: Date = new Date(firstMessage.createdAt);
        for (const thread of threads) {
            if (!DateUtil.differenceInCalendarDays(new Date(thread.createdAt), firstMessageDate)) continue;
            thread.isFirstMessageOfDay = true;
            firstMessageDate = new Date(thread.createdAt);
        }
    }

    private static createEmptyContact(): ChatContact {
        const contact: ChatContact = new ChatContact();
        contact.id = '';
        contact.name = 'Contato removido';
        contact.displayPhone = 'Telefone indisponível';
        return contact;
    }
}

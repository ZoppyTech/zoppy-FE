import { WhatsappAccountManagerEntity } from './whatsapp-account-manager.entity';
import { WhatsappContactEntity } from './whatsapp-contact.entity';
import { WhatsappMessageEntity } from './whatsapp-message.entity';

export class WhatsappConversationEntity {
    public declare id: string;
    public declare ticket: string;
    public declare sessionExpiration: string | null;
    public declare wppContactId: string;
    public declare wppManagerId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare finishedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;

    /** INCLUDES */
    public declare wppAccountManager: WhatsappAccountManagerEntity;
    public declare wppContact: WhatsappContactEntity;
    public declare messages: WhatsappMessageEntity[];

    public static validateSessionExpiration(entity: WhatsappConversationEntity): WhatsappConversationEntity {
        if (!entity.sessionExpiration) {
            return entity;
        }
        if (new Date(Number.parseInt(entity.sessionExpiration)).getTime() > new Date().getTime()) {
            return entity;
        }
        entity.sessionExpiration = null;
        return entity;
    }
}
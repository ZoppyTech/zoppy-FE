import { WhatsappAccountManagerEntity } from './whatsapp-account-manager.entity';
import { WhatsappContactEntity } from './whatsapp-contact.entity';
import { WhatsappConversationEntity } from './whatsapp-conversation.entity';
import { WhatsappMediaMessageEntity } from './whatsapp-media-message.entity';

export class WhatsappMessageEntity {
    public declare id: string;
    public declare type: string;
    public declare content: string;
    public declare headerContent: string;
    public declare footerContent: string;
    public declare ctaLabel: string;
    public declare ctaLink: string;
    public declare status: string;
    public declare origin: string;
    public declare wamId?: string;
    public declare wppContactId: string;
    public declare wppManagerId?: string;
    public declare wppPhoneNumberId: string;
    public declare wppMessageTemplateId?: string;
    public declare wppMediaMessageId?: string;
    public declare parentMessageId?: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt?: Date;
    public declare companyId: string;

    /** optional */
    public declare userId?: string;
    public declare parameters?: Array<string>;

    /** Includes */
    public declare WppConversation?: WhatsappConversationEntity;
    public declare manager?: WhatsappAccountManagerEntity;
    public declare contact?: WhatsappContactEntity;
    public declare media: WhatsappMediaMessageEntity;
}

import { WhatsappAccountManagerEntity } from './whatsapp-account-manager.entity';
import { WhatsappContactEntity } from './whatsapp-contact.entity';
import { WhatsappConversationEntity } from './whatsapp-conversation.entity';
import { WhatsappMediaMessageEntity } from './whatsapp-media-message.entity';

//TODO: Temporary use
export class WhatsappMessageEntity {
    public declare id?: string;
    public declare type: string;
    public declare content: string;
    public declare status: string;
    public declare origin: string;
    //public declare wamId?: string;
    public declare wppContactId: string;
    public declare wppManagerId?: string;
    //public declare wppPhoneNumberId: string;
    //public declare wppMessageTemplateId?: string;
    //public declare wppMediaMessageId?: string;
    //public declare parentMessageId?: string;
    public declare createdAt: Date;
    //public declare updatedAt: Date;
    public declare deletedAt?: Date;
    public declare companyId: string;

    /** optional */
    public declare userId?: string;
    public declare parameters?: Array<string>;

    /** Includes */
    public declare WppConversation?: WhatsappConversationEntity; //TODO REMOVER DEPOIS DA REFATORACAO!!!
    public declare wppAccountManager?: WhatsappAccountManagerEntity;
    public declare wppContact?: WhatsappContactEntity;
    public declare wppMediaMessage: WhatsappMediaMessageEntity;
}

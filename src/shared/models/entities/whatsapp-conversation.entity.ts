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
    public manager: WhatsappAccountManagerEntity | null = null;
    public declare contact: WhatsappContactEntity;
    public messages: WhatsappMessageEntity[] = [];
}

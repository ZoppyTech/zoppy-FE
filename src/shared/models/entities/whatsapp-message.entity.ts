import { WhatsappContactEntity } from './whatsapp-contact.entity';

//TODO: Temporary use
export class WhatsappMessageEntity {
    public declare id?: string;
    public declare type: string;
    public declare content: string;
    public declare status: string;
    public declare origin: string;
    public declare wamId?: string;
    public declare wppContactId: string;
    public declare wppManagerId?: string;
    public declare wppPhoneNumberId: string;
    public declare wppMessageTemplateId?: string;
    public declare parentMessageId?: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt?: Date;
    public declare companyId: string;

    /** optional */
    public declare userId?: string;
    public declare parameters?: Array<string>;

    /** Includes */
    public declare wppContact?: WhatsappContactEntity;
}

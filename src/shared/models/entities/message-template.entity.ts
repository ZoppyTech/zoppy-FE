import { WhatsappMessageTemplateEntity } from './whatsapp-message-template.entity';

export class MessageTemplateEntity {
    public declare id: string;
    public declare parameters: string[];
    public declare text: string;
    public declare position: number;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
    public declare companyId: string;
    public declare messageTemplateGroupId: string;
    public declare messageTemplates: MessageTemplateEntity[];
    public declare whatsappMessageTemplate: WhatsappMessageTemplateEntity;
}

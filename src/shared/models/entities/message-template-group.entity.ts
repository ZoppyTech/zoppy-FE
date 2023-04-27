import { MessageTemplateEntity } from './message-template.entity';
import { WppMessageTemplateEntity } from './wpp-message-template.entity';

export class MessageTemplateGroupEntity {
    public declare id: string;
    public declare name: string;
    public declare identifier: string;
    public declare type: MessageTemplateGroupType;
    public declare description: string;
    public declare default: boolean;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
    public declare companyId: string;
    public declare messageTemplates: MessageTemplateEntity[];
    public declare whatsappMessageTemplate: WppMessageTemplateEntity;
}
export declare type MessageTemplateGroupType = 'whatsapp' | 'sms' | 'email';

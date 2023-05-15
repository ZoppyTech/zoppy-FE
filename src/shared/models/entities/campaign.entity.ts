import { MessageTemplateGroupEntity } from './message-template-group.entity';

export class CampaignEntity {
    public declare id: string;
    public declare attempts: number;
    public declare success: string[];
    public declare failed: string[];
    public declare file: string;
    public declare name: string;
    public declare activationDate: Date;
    public declare sentAt: Date;
    public declare companyId: string;
    public declare messageTemplateGroupId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;

    public declare messageTemplateGroup: MessageTemplateGroupEntity;
}

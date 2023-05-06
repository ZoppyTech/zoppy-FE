export class WhatsappMessageTemplateEntity {
    public declare id: string;
    public declare wppId: string;
    public declare wppName: string;
    public declare headerParams: string[];
    public declare headerMessage: string;
    public declare footerMessage: string;
    public declare ctaLabel: string;
    public declare ctaLink: string;
    public declare status: string;
    public declare type: WhatsappMessageTemplateType;
    public declare visible: boolean;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
    public declare companyId: string;
    public declare messageTemplateGroupId: string;
}

export type WhatsappMessageTemplateType = 'text' | 'image' | 'video' | 'location';

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
}

export class ThreadMessage {
    public declare id?: string;
    public declare type: string;
    public declare templateName?: string;
    public declare content: string;
    public declare status: string;
    public declare isBusiness: boolean;
    public declare isFirstMessageOfDay: boolean;
    public declare createdAt: Date;
    public declare updatedAt?: Date;
    public deletedAt?: Date | null = null;
}

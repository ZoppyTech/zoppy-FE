export class ThreadMessage {
    public declare id?: string;
    public declare type: string;
    public declare templateName?: string;
    public declare content: string;
    public declare status: string;
    public declare isBusiness: boolean;
    public declare readByManager: boolean;
    public declare isFirstMessageOfDay: boolean;
    public declare wamId?: string;
    public declare createdAt: Date;
    public declare updatedAt?: Date;
    public deletedAt?: Date | null = null;
}

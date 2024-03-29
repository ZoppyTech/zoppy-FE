export class ThreadMessage {
    public declare id: string;
    public declare type: string;
    public declare templateName?: string;
    public declare content: string;
    public declare headerText: string;
    public declare footerText: string;
    public declare ctaLink: string;
    public declare ctaLabel: string;
    public declare status: string;
    public declare senderName: string;
    public declare isBusiness: boolean;
    public declare readByManager: boolean;
    public declare isFirstMessageOfDay: boolean;
    public media?: ThreadMediaMessage | null = null;
    public declare companyId: string;
    public declare createdAt: Date;
    public deletedAt?: Date | null = null;
}

export class ThreadMediaMessage {
    public declare id: string;
    public declare url: string;
    public declare caption: string;
    public declare mimeType: string;
    public fileSize: number = 0;
}

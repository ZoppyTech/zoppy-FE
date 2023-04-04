export class WppConversation {
    public declare ticket: string;
    public declare sessionExpiration: string | null;
    public declare finishedAt: Date;
    public declare companyId: string;
    public manager: WppManager | null = null;
    public contact: WppContact = new WppContact();
    public threads: Array<WppMessage> = [];
    public unreadThreads: Array<WppMessage> = [];
    public actived: boolean = false;
}

export class WppManager {
    public declare id: string;
    public declare name: string;
    public declare wppPhoneNumberId: string;
    public declare wppAccountId: string;
}

export class WppContact {
    public declare id: string;
    public declare firstName: string;
    public declare lastName: string;
    public declare displayName: string;
    public declare displayPhone: string;
    public declare hasIndex: boolean;
    public declare isBlocked: boolean;
    public declare createdAt: Date;
    public declare companyId: string;
}

export class WppMessage {
    public declare id?: string;
    public declare type: string;
    public declare templateName?: string;
    public declare content: string;
    public declare status: string;
    public declare isBusiness: boolean;
    public declare readByManager: boolean;
    public declare isFirstMessageOfDay: boolean;
    public declare wamId?: string;
    public declare media?: WppMediaMessage;
    public declare companyId: string;
    public declare createdAt: Date;
    public declare updatedAt?: Date;
    public deletedAt?: Date | null = null;
}

export class WppMediaMessage {
    public declare id: string;
    public declare url: string;
    public declare caption: string;
    public declare mimeType: string;
    public declare sha256: string;
    public declare fileSize: number;
}

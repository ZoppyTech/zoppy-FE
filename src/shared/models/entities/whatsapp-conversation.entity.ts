export class WhatsappConversationEntity {
    public declare id: string;
    public declare ticket: string;
    public declare sessionExpiration: string | null;
    public declare wppContactId: string;
    public declare wppManagerId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare finishedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;

    public static validateSessionExpiration(entity: WhatsappConversationEntity): WhatsappConversationEntity {
        debugger;
        if (!entity.sessionExpiration) {
            return entity;
        }
        if (new Date(Number.parseInt(entity.sessionExpiration)).getTime() > new Date().getTime()) {
            return entity;
        }
        entity.sessionExpiration = null;
        return entity;
    }
}

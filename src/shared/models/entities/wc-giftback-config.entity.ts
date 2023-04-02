export class WcGiftbackConfigEntity {
    public declare id?: string;
    public declare percentValue?: number;
    public declare maxPercentValue?: number;
    public declare expirationDays?: number;
    public declare abandonedCartDelay: number;
    public declare expirationDate?: Date;
    public declare createdAt?: Date;
    public declare updatedAt?: Date | null;
    public declare deletedAt?: Date | null;
    public declare companyId?: string;
}

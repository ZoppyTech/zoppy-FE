export class WcGiftbackConfigEntity {
    public declare id?: string;
    public declare percentValue?: number;
    public declare maxPercentValue?: number;
    public declare expirationDays?: number;
    public declare abandonedCartDelay: number;
    public declare excludeSaleItems: boolean;
    public declare allowedCategories: Array<GiftbackConfigCategory>;
    public declare acumulative: boolean;
    public declare startDays?: number;
    public declare afterSaleDays?: number;
    public declare expirationDate?: Date;
    public declare npsRatingDays?: number;
    public declare enableGiftback: boolean;
    public declare enableAfterSale: boolean;
    public declare enableNPS: boolean;
    public declare enableBirthday: boolean;
    public declare enableAbandonedCart: boolean;
    public declare createdAt?: Date;
    public declare updatedAt?: Date | null;
    public declare deletedAt?: Date | null;
    public declare companyId?: string;
}

export interface GiftbackConfigCategory {
    id: any;
    name: string;
}

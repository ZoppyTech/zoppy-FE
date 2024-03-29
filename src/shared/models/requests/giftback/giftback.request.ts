import { WcGiftbackConfigEntity } from '../../entities/wc-giftback-config.entity';

export interface GiftbackRequest extends WcGiftbackConfigEntity {
    id?: string;
    percentValue?: number;
    maxPercentValue?: number;
    expirationDays?: number;
    startDays?: number;
    afterSaleDays?: number;
    abandonedCartDelay: number;
    npsRatingDays?: number;
    excludeSaleItems: boolean;
    allowedCategories: Array<GiftbackCategoryRequest>;
    acumulative: boolean;
    sendReminder: boolean;
    sendCloseReminder: boolean;
}

export interface GiftbackCategoryRequest {
    id: any;
    name: string;
}

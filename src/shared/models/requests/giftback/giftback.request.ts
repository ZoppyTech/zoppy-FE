import { WcGiftbackConfigEntity } from '../../entities/wc-giftback-config.entity';

export interface GiftbackRequest extends WcGiftbackConfigEntity {
    id?: string;
    percentValue?: number;
    maxPercentValue?: number;
    expirationDays?: number;
    startDays?: number;
    afterSaleDays?: number;
}

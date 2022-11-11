export interface CrmCouponRequest {
    id?: string;
    amount?: number | string;
    code?: string;
    phone?: string;
    type?: string;
    used?: boolean;
    expiryDate?: Date;
    minPurchaseValue?: number;
    maxPercentPurchaseValue?: number;
}

export interface CrmCouponRequest {
    id?: string;
    amount: number;
    code?: string;
    phone?: string;
    type?: string;
    used?: boolean;
    expiryDate?: Date;
    minPurchaseValue?: number;
    maxPurchaseValue?: number;
}

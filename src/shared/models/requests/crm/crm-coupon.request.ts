export interface CrmCouponRequest {
    id?: string;
    amount: number;
    code?: string;
    phone?: string;
    used?: boolean;
    expiryDate?: Date;
    minimumAmount?: number;
    maximumAmount?: number;
}

export interface CrmCouponRequest {
    id?: string;
    code?: string;
    phone?: string;
    used?: boolean;
    expiryDate?: Date;
    minimumAmount?: number;
    maximumAmount?: number;
}

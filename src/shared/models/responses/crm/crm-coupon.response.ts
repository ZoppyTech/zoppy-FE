export class CrmCouponResponse {
    public declare id?: string;
    public declare code?: string;
    public declare organization?: string;
    public declare phone?: string;
    public declare description?: string;
    public declare used?: boolean;
    public declare expiryDate?: Date;
    public declare createdAt?: Date;
    public declare amount?: number | string;
    public declare minPurchaseValue?: number | string;
}

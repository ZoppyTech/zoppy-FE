export class WcCouponEntity {
    public declare id: string;
    public declare wcId: number;
    public declare type: string;
    public declare used: boolean;
    public declare code: string;
    public declare phone: string;
    public declare amount: number;
    public declare individualUse: boolean;
    public declare usageLimit: string;
    public declare expiryDate: Date;
    public declare minPurchaseValue: number;
    public declare maxPercentPurchaseValue: number;
    public declare description: string;
    public declare createdAt: Date;
    public declare updatedAt: Date | null;
    public declare deletedAt: Date | null;
}

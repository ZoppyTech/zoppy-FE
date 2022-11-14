export class CrmCustomerCouponDetailResponse {
    public declare expiryDate: Date;
    public declare amount: string;
    public declare minPurchaseValue: string;
}

export class CrmCustomerDetailResponse {
    public declare id: string;
    public declare name: string;
    public declare phone: string;
    public declare gender: string;
    public declare totalSpent: string;
    public declare countPurchases: number;
    public declare lastPurchaseDate: Date;
    public declare birthDate: Date;
    public declare coupon?: CrmCustomerCouponDetailResponse;
}

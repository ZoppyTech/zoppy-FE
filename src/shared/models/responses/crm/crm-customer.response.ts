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

export class CrmCustomerResponse {
    public declare id?: string;
    public declare billingId?: string;
    public declare firstName?: string;
    public declare lastName?: string;
    public declare companyName?: string;
    public declare address1?: string;
    public declare address2?: string;
    public declare city?: string;
    public declare state?: string;
    public declare postcode?: string;
    public declare country?: string;
    public declare email?: string;
    public declare phone?: string;
    public declare birthDate?: Date;
    public declare gender?: string;
}

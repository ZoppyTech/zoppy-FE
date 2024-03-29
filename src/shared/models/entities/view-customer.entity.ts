import { WcCouponEntity } from './wc-coupon.entity';

export class ViewCustomerEntity {
    public declare id: string;
    public declare externalId: string;
    public declare firstName: string;
    public declare lastName: string;
    public declare email: string;
    public declare phone: string;
    public declare birthDate: Date;
    public declare gender: string;
    public declare state: string;
    public declare city: string;
    public declare postcode: string;
    public declare country: string;
    public declare latitude: number;
    public declare longitude: number;
    public declare address1: string;
    public declare address2: string;
    public declare recency: number;
    public declare frequency: number;
    public declare amount: number;
    public declare position: string;
    public declare block: boolean;
    public declare fullName: string;
    public declare lastPurchase: Date;
    public declare firstPurchase: Date;
    public declare totalSales: number;
    public declare totalAmount: number;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare addressId: string;
    public declare userId: string;

    //computed field
    public declare coupon: WcCouponEntity;
}

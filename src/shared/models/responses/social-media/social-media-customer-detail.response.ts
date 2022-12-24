import { WcCouponEntity } from '../../entities/wc-coupon.entity';
import { MatrixRFMResponse } from '../reports/matrix-rfm.response';

export class SocialMediaCustomerDetailResponse {
    public customerId: string = '';
    public addressId: string = '';
    public name: string = '';
    public lastPurchaseDate: Date = new Date();
    public clientSince: Date = new Date();
    public phone: string = '';
    public email: string = '';
    public birthdate: Date = new Date();
    public age: number = 0;
    public purchaseCount: number = 0;
    public fullAddress: string = '';
    public gender: string = '';
    public registerType: string = '';
    public userName: string = '';
    public rfm: MatrixRFMResponse = new MatrixRFMResponse();
    public averageTicket: string = '';
    public totalSpent: string = '';
    public giftback: SocialMediaGiftbackResponse = new SocialMediaGiftbackResponse();
}

export class SocialMediaGiftbackResponse {
    public declare minPurchaseValue: string;
    public declare expiryDate: Date;
    public declare startDate: Date;
    public declare amount: string;
    public declare code: string;
}

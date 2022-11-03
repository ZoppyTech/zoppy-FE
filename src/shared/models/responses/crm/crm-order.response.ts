import { CrmAddressResponse } from './crm-address.response';
import { CrmCouponResponse } from './crm-coupon.response';
import { CrmLineItemResponse } from './crm-line-item.response';

export class CrmOrderResponse {
    public declare wcCouponCode: string;
    public declare completedAt: Date;
    public declare status: string;
    public declare total: number;
    public declare billingId: string;
    public declare customerId: string;
    public declare coupon: CrmCouponResponse;
    public declare lineItems: CrmLineItemResponse[];
    public declare address: CrmAddressResponse;
}

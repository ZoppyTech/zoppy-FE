import { CrmAddressRequest } from './crm-address.request';
import { CrmCouponRequest } from './crm-coupon.request';
import { CrmLineItemRequest } from './crm-line-item.request';

export interface CrmOrderRequest {
    total?: number | string;
    operation?: Operations;
    coupon: CrmCouponRequest;
    address: CrmAddressRequest;
    lineItems?: CrmLineItemRequest[];
}

export type Operations = 'show-room' | 'e-commerce';

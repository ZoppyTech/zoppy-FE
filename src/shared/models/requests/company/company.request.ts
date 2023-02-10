import { PaymentRequest } from './payment.request';

export class CompanyRequest {
    public id?: string;
    public name?: string;
    public phone?: string;
    public revenueRecord?: string;
    public email?: string;
    public plan?: string;
    public provider?: CompanyProvider;
    public payment?: PaymentRequest;
}

export type CompanyProvider = 'woo-commerce' | 'shopify' | 'nuvemshop' | 'tray' | 'yampi' | 'dooca';

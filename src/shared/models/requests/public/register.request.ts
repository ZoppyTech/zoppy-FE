import { AddressRequest } from '../company/address.request';
import { CompanyProvider } from '../company/company.request';
import { PaymentRequest } from '../company/payment.request';

export class RegisterRequest {
    public declare name: string;
    public declare phone: string;
    public declare email: string;
    public declare companyName: string;
    public declare revenueRecord: string;
    public declare segment: string;
    public declare companyRole: string;
    public declare goal: string;
    public declare channel: string;
    public declare password: string;
    public declare plan?: CompanyPlan;
    public declare provider?: CompanyProvider;
    public declare payment?: PaymentRequest;
    public declare address?: AddressRequest;
}

export type CompanyPlan = 'premium' | 'standard' | 'basic' | 'free';

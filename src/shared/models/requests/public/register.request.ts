import { CompanyProvider } from '../company/company.request';
import { PaymentRequest } from '../company/payment.request';

export class RegisterRequest {
    public declare name: string;
    public declare phone: string;
    public declare email: string;
    public declare companyName: string;
    public declare password: string;
    public plan?: CompanyPlan;
    public provider?: CompanyProvider;
    public payment?: PaymentRequest;
}

export type CompanyPlan = 'premium' | 'standard' | 'basic' | 'free';

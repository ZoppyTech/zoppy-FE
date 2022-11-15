import { WhatsappAccountPhoneNumberRequest } from '../whatsapp-account-phone-number/whatsapp-account-phone-number.request';

export interface WhatsappAccountRequest {
    id: string;
    businessName: string;
    description: string;
    wabaId: string;
    appId: string;
    apiAccessToken: string | null;
    businessPhone: WhatsappAccountPhoneNumberRequest;
}

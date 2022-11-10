export interface SignWhatsappAccountRequest {
    businessName: string;
    description: string;
    businessPhone: SignWhatsappAccountPhoneNumberRequest;
}

export interface SignWhatsappAccountPhoneNumberRequest {
    phoneNumber: string;
    permissions: string;
    default: boolean;
}

export interface SignWhatsappAccountRequest {
    businessName: string;
    description: string;
    businessPhone: SignWhatsappAccountPhoneNumberRequest;
}

export interface SignWhatsappAccountPhoneNumberRequest {
    phoneNumber: string;
    businessHoursEnabled: boolean;
    default: boolean;
}

export interface WhatsappContactRequest {
    id?: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    subdivisionCode: string;
    phone: string;
    isBlocked: boolean;
}

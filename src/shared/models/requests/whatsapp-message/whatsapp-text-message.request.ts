export interface WhatsappTextMessageRequest {
    id?: string;
    content: string;
    wppManagerId: string;
    wppContactId: string;
    wppPhoneNumberId: string;
    parentMessageId?: string;
}

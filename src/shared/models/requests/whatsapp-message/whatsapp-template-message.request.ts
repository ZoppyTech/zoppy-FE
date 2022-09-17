export interface WhatsappTemplateMessageRequest {
    name: string;
    wppContactId: string;
    wppPhoneNumberId: string;
    parameters: Array<string>;
}

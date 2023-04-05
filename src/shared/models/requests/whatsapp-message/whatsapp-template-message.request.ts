export interface WhatsappTemplateMessageRequest {
    id?: string;
    name: string;
    wppManagerId: string;
    wppContactId: string;
    wppPhoneNumberId: string;
    parameters: Array<string>;
}

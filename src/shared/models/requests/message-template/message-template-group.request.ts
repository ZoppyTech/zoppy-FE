export interface MessageTemplateGroupRequest {
    name: string;
    description: string;
    type: MessageTemplateGroupType;
}
type MessageTemplateGroupType = 'whatsapp' | 'sms' | 'email';

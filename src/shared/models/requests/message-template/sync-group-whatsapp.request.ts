import { WhatsappMessageTemplateType } from '../../entities/whatsapp-message-template.entity';

export class SyncGroupWhatsappRequest {
    public declare headerMessage: string;
    public declare footerMessage: string;
    public declare ctaLabel: string;
    public declare ctaLink: string;
    public declare visible: boolean;
    public declare type: WhatsappMessageTemplateType;
    public declare file?: any;
}

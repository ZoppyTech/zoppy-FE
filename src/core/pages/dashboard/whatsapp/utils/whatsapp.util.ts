import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { ChatRoom } from '../models/chat-room';
import { ThreadMessage } from '../models/thread-message';

export class WhatsappUtil {
    public static replaceVariablesFromTemplateMessage(message: string, parameters: Array<string> = []): string {
        if (parameters.length <= 0) return message;
        for (const varMatch of message.matchAll(WhatsappConstants.TEMPLATE_PARAMETERS_REGEX)) {
            message = message.replace(varMatch[0], parameters.shift() ?? varMatch[0]);
        }
        return message;
    }

    public static removeCountryCode(phoneNumber: string): string {
        return phoneNumber.replace('+55 ', '');
    }

    public static formatDisplayPhone(countryCode: string, subdivisionCode: string, phoneNumber: string): string {
        return `+${countryCode} ${subdivisionCode} ${phoneNumber.slice(0, phoneNumber.length - 4)}-${phoneNumber.slice(
            phoneNumber.length - 4,
            phoneNumber.length
        )}`;
    }

    public static findLastIndexOfMessageSent(threads: ThreadMessage[]): number {
        const elementIndex: number =
            threads.length -
            threads.reverse().findIndex((thread: ThreadMessage) => {
                return !thread.wamId;
            }) -
            1;
        threads.reverse();
        return elementIndex;
    }

    public static getMessageTemplateParams(templateName: string, chatRoom: ChatRoom): Array<string> {
        switch (templateName) {
            case WhatsappConstants.MessageTemplates.GDPR_TERMS_NOTIFICATION:
                return [chatRoom.contact.firstName];
            case WhatsappConstants.MessageTemplates.NEW_CONTACT_PHONE_NUMBER_TO_ASK_QUESTIONS:
                return [chatRoom.contact.firstName];
            case WhatsappConstants.MessageTemplates.GREETINGS_TO_USER:
                return [chatRoom.contact.firstName, chatRoom.manager.name];
            case WhatsappConstants.MessageTemplates.WELCOME_TO_THE_COMPANY:
                return [chatRoom.account.businessName];
            case WhatsappConstants.MessageTemplates.ISSUE_RESOLUTION:
                return [chatRoom.contact.firstName];
            case WhatsappConstants.MessageTemplates.OUT_OF_BUSINESS_HOURS:
                return [chatRoom.account.businessName, '9h', '18h'];
            case WhatsappConstants.MessageTemplates.WAITING_A_FEW_MINUTES:
            default:
                return [];
        }
    }
}

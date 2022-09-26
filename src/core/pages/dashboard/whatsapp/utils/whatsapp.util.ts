import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { ChatRoom } from '../models/chat-room';
import { ThreadMessage } from '../models/thread-message';

export class WhatsappUtil {
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
            case WhatsappConstants.MessageTemplates.GREETINGS_TO_USER:
                return [chatRoom.contact.name, chatRoom.manager.name];
            case WhatsappConstants.MessageTemplates.WELCOME_TO_THE_COMPANY:
                return [chatRoom.account.businessName];
            case WhatsappConstants.MessageTemplates.SAMPLE_ISSUE_RESOLUTION:
                return [chatRoom.contact.name];
            case WhatsappConstants.MessageTemplates.OUT_OF_BUSINESS_HOURS:
                return [chatRoom.account.businessName, '9h', '18h'];
            case WhatsappConstants.MessageTemplates.WAITING_A_FEW_MINUTES:
            default:
                return [];
        }
    }
}

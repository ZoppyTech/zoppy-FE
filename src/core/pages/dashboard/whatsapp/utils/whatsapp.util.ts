import { WhatsappConstants, CountryCodes, StringUtil } from '@ZoppyTech/utilities';
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

    public static removeCountryCode(phone: string): string {
        return phone.replace('+55 ', '');
    }

    public static formatDisplayPhone(countryCode: string, subdivisionCode: string, phone: string): string {
        return `+${countryCode} ${subdivisionCode} ${phone.slice(2, phone.length - 4)}-${phone.slice(phone.length - 4, phone.length)}`;
    }

    // TODO: Remover apos refatoracao na exibicao inicial das mensagens do chat
    public static findLastIndexOfMessageSent(threads: ThreadMessage[]): number {
        // const elementIndex: number =
        //     threads.length -
        //     threads.reverse().findIndex((thread: ThreadMessage) => {
        //         return !thread.wamId;
        //     }) -
        //     1;
        // threads.reverse();
        // return elementIndex;
        return 0;
    }

    public static getMessageTemplateParams(templateName: string, chatRoom: ChatRoom): Array<string> {
        switch (templateName) {
            case WhatsappConstants.MessageTemplates.GDPR_TERMS_NOTIFICATION:
            case 'answer_me_a_question':
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
                return [chatRoom.account.businessName, '8h', '18h'];
            case 'greetings_to_user_2':
                return [chatRoom.manager.name];
            case WhatsappConstants.MessageTemplates.WAITING_A_FEW_MINUTES:
            default:
                return [];
        }
    }

    public static slicePhone(phone: string, skipWrongPhone: boolean = false): PhoneNumberSliced {
        phone = StringUtil.onlyNumbers(phone);
        switch (phone.length) {
            case 13:
                return new PhoneNumberSliced(phone.substring(0, 2), phone.substring(2, 4), phone.substring(4, phone.length));
            case 12:
                return new PhoneNumberSliced(phone.substring(0, 2), phone.substring(2, 4), '9' + phone.substring(4, phone.length));
            case 11:
                return new PhoneNumberSliced(CountryCodes.Brazil, phone.substring(0, 2), phone.substring(2, phone.length));
            case 10:
                return new PhoneNumberSliced(CountryCodes.Brazil, phone.substring(0, 2), '9' + phone.substring(2, phone.length));
            default:
                throw new Error();
        }
    }
}

export class PhoneNumberSliced {
    public constructor(public countryCode: string, public subdivisionCode: string, public phone: string) {
        this.countryCode = countryCode;
        this.subdivisionCode = subdivisionCode;
        this.phone = phone;
    }

    public getFullPhone(): string {
        return `${this.countryCode}${this.subdivisionCode}${this.phone}`;
    }

    public getPhoneWithoutCountryCode(): string {
        return `${this.subdivisionCode}${this.phone}`;
    }
}

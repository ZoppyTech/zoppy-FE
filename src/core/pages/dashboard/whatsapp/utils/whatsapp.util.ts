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
}

export class WhatsappUtil {
    public static formatDisplayPhone(countryCode: string, subdivisionCode: string, phoneNumber: string): string {
        return `+${countryCode} ${subdivisionCode} ${phoneNumber.slice(0, phoneNumber.length - 4)}-${phoneNumber.slice(
            phoneNumber.length - 4,
            phoneNumber.length
        )}`;
    }
}

import { PhoneNumberSliced, WhatsappUtil } from 'src/core/pages/dashboard/whatsapp/utils/whatsapp.util';

export class FormatUtils {
    public static toCurrency(value: number, currency: Currencies = 'BRL'): string {
        return value?.toLocaleString('pt-br', { style: 'currency', currency: currency, minimumFractionDigits: 2 });
    }

    public static toPercent(value: number): string {
        if (!value) return '0%';
        return (value * 100).toFixed(2).replace('.', ',') + '%';
    }

    public static currencyToNumber(value: string): number {
        return Number(value.replace(/[^0-9,-]+/g, ''));
    }

    public static applyBrMaskToPhone(phone: string): string {
        if (!phone) return '';
        const phoneSliced: PhoneNumberSliced = WhatsappUtil.slicePhone(phone.toString(), true);
        if (!phoneSliced) return '';

        return `+${phoneSliced.countryCode} (${phoneSliced.subdivisionCode}) ${phoneSliced.phoneNumber.substring(
            0,
            5
        )}-${phoneSliced.phoneNumber.substring(5, phoneSliced.phoneNumber.length)}`;
    }
}
export type Currencies = 'BRL' | 'USD';

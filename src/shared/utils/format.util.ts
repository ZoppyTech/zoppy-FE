export class FormatUtils {
    public static toCurrency(value: number, currency: Currencies = 'BRL'): string {
        return value?.toLocaleString('pt-br', { style: 'currency', currency: currency, minimumFractionDigits: 2 });
    }

    public static toPercent(value: number): string {
        if (!value) return '0%';
        return (value * 100).toFixed(2).replace('.', ',') + '%';
    }
}

export type Currencies = 'BRL' | 'USD';

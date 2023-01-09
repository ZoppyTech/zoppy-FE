export class MathUtil {
    public static ruleOfThree(value: number, total: number): string {
        if (!total) return '0';
        return ((value * 100) / total).toFixed(2);
    }
}

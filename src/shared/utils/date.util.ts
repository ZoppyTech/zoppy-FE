export class DateUtil {
    public static addDays(date: Date, days: number) {
        const response: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
        return response;
    }
}

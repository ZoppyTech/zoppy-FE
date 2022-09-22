export class DateUtil {
    public static addDays(date: Date, days: number) {
        const response: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
        return response;
    }

    public static differenceInCalendarDays(dateLeft: Date, dateRight: Date = new Date()): number {
        const currentDate: Date = dateRight;
        dateLeft = new Date(dateLeft);
        return Math.floor(
            (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
                Date.UTC(dateLeft.getFullYear(), dateLeft.getMonth(), dateLeft.getDate())) /
                (1000 * 60 * 60 * 24)
        );
    }

    public static delay(timeout: number = 1000): Promise<any> {
        return new Promise((resolve: any) => setTimeout(resolve, timeout));
    }
}

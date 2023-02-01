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

    public static getFirstAndLastDayOfCurrentWeek(): FirstAndLastDayOfWeek {
        debugger;
        const curr: Date = new Date();
        const firstday: Date = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        const lastday: Date = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
        return {
            firstday: firstday,
            lastday: lastday
        };
    }

    public static getMonthName(monthIndex: number): string {
        switch (monthIndex) {
            case 0:
                return 'Janeiro';
            case 1:
                return 'Fevereiro';
            case 2:
                return 'Março';
            case 3:
                return 'Abril';
            case 4:
                return 'Maio';
            case 5:
                return 'Junho';
            case 6:
                return 'Julho';
            case 7:
                return 'Agosto';
            case 8:
                return 'Setembro';
            case 9:
                return 'Outubro';
            case 10:
                return 'Novembro';
            case 11:
                return 'Dezembro';
            default:
                return '';
        }
    }

    public static getDayName(dayIndex: number): string {
        switch (dayIndex) {
            case 0:
                return 'Domingo';
            case 1:
                return 'Segunda Feira';
            case 2:
                return 'Terça Feira';
            case 3:
                return 'Quarta Feira';
            case 4:
                return 'Quinta Feira';
            case 5:
                return 'Sexta Feira';
            case 6:
                return 'Sábado';
            default:
                return '';
        }
    }
}

export interface FirstAndLastDayOfWeek {
    firstday: Date;
    lastday: Date;
}

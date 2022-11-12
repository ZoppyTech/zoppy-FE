export class DailySalesResponse {
    public invoices: DailySale[];

    public constructor() {
        this.invoices = [
            new DailySale(),
            new DailySale(),
            new DailySale(),
            new DailySale(),
            new DailySale(),
            new DailySale(),
            new DailySale()
        ];
    }
}

export class DailySale {
    public sales?: number = 0;
    public avgTicket?: string = '';
    public total?: number = 0;
    public name: string = '';
}

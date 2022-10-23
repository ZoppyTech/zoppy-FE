export class MonthlyInvoiceResponse {
    public invoices: MonthInvoice[] = [];

    public constructor() {
        this.invoices = [
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice(),
            new MonthInvoice()
        ];
    }
}

export class MonthInvoice {
    public invoice: number = 0;
    public zoppyInvoice?: number = 0;
    public invoiceCurrency?: string = '';
    public zoppyInvoiceCurrency?: string = '';
    public name: string = '';
}

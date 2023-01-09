export class MonthlyInvoiceResponse {
    public invoices: Record<string, MonthInvoice> = {};
}

export class MonthInvoice {
    public invoice?: number = 0;
    public zoppyInvoice?: number = 0;
}

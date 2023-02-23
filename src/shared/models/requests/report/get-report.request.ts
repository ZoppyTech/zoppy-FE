export class GetReportRequest {
    public startPeriod: Date = new Date();
    public finishPeriod: Date = new Date();
}

export type ReportPeriod = 30 | 60 | 90 | 'all';

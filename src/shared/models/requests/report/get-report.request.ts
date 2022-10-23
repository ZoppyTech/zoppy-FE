export class GetReportRequest {
    public period: ReportPeriod = 30;
}

export type ReportPeriod = 30 | 60 | 90;

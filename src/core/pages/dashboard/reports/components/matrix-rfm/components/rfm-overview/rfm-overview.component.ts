import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer.response';

@Component({
    selector: 'rfm-overview',
    templateUrl: './rfm-overview.component.html',
    styleUrls: ['./rfm-overview.component.scss']
})
export class RfmOverviewComponent {
    @Input() public isLoading: boolean = true;
    @Input() public customers: Array<ReportCustomerResponse> = [];
    @Input() public reportRequest?: GetReportRequest;
    @Output() public customersChange: EventEmitter<Array<ReportCustomerResponse>> = new EventEmitter<Array<ReportCustomerResponse>>();
}

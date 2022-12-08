import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';

@Component({
    selector: 'rfm-overview',
    templateUrl: './rfm-overview.component.html',
    styleUrls: ['./rfm-overview.component.scss']
})
export class RfmOverviewComponent {
    @Input() public isLoading: boolean = true;
    @Input() public customers: Array<ReportCustomerResponse> = [];
    @Output() public customersChange: EventEmitter<Array<ReportCustomerResponse>> = new EventEmitter<Array<ReportCustomerResponse>>();
}

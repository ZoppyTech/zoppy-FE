import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { RfmResponse } from 'src/shared/models/responses/reports/rfm.response';

@Component({
    selector: 'rfm-overview',
    templateUrl: './rfm-overview.component.html',
    styleUrls: ['./rfm-overview.component.scss']
})
export class RfmOverviewComponent {
    @Input() public isLoading: boolean = true;
    @Input() public rfm: RfmResponse = new RfmResponse();
    @Input() public reportRequest?: GetReportRequest;
}

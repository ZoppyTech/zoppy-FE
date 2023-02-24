import { Component, Input } from '@angular/core';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';

@Component({
    selector: 'demographic-data',
    templateUrl: './demographic-data.component.html',
    styleUrls: ['./demographic-data.component.scss']
})
export class DemographicDataComponent {
    @Input() public reportRequest?: GetReportRequest;
}

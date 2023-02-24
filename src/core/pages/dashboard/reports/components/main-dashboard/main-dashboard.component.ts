import { Component, Input } from '@angular/core';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';

@Component({
    selector: 'main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
    @Input() public reportRequest?: GetReportRequest;
}

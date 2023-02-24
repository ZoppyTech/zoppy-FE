import { Component, Input } from '@angular/core';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';

@Component({
    selector: 'nps',
    templateUrl: './nps.component.html',
    styleUrls: ['./nps.component.scss']
})
export class NpsComponent {
    @Input() public reportRequest?: GetReportRequest;
}

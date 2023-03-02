import { Component, Input, OnInit } from '@angular/core';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';

@Component({
    selector: 'demographic-data',
    templateUrl: './demographic-data.component.html',
    styleUrls: ['./demographic-data.component.scss']
})
export class DemographicDataComponent implements OnInit {
    public loaded: boolean = false;

    public ngOnInit(): void {
        setTimeout(() => {
            this.loaded = true;
        });
    }
    @Input() public reportRequest?: GetReportRequest;
}

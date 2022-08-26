import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public constructor() {}

    public ngOnInit() {
        console.log(`do nothing`);
    }
}

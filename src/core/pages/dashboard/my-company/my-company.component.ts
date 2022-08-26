import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
    public constructor() {}

    public ngOnInit() {
        console.log(`do nothing`);
    }
}

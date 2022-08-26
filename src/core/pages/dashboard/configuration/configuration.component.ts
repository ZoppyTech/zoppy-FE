import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    public constructor() {}

    public ngOnInit() {
        console.log(`do nothing`);
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-time-divider',
    templateUrl: './time-divider.component.html',
    styleUrls: ['./time-divider.component.scss']
})
export class TimeDividerComponent implements OnInit {
    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bubble-info',
    templateUrl: './bubble-info.component.html',
    styleUrls: ['./bubble-info.component.scss']
})
export class BubbleInfoComponent implements OnInit {
    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

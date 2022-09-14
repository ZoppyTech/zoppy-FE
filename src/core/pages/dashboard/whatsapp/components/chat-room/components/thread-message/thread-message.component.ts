import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-thread-message',
    templateUrl: './thread-message.component.html',
    styleUrls: ['./thread-message.component.scss']
})
export class ThreadMessageComponent implements OnInit {
    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

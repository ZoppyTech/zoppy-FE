import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-text-message',
    templateUrl: './text-message.component.html',
    styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent implements OnInit {
    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

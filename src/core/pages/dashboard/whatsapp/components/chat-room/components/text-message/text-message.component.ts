import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'text-message',
    templateUrl: './text-message.component.html',
    styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent implements OnInit {
    @Input() public text: string = '';
    @Input() public isBusiness: boolean = true;
    @Input() public hasDeleted: boolean = false;

    public truncateEnable: boolean = false;
    public hideButtonVisible: boolean = false;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

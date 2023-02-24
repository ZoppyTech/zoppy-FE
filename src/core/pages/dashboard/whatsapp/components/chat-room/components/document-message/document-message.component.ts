import { Component, Input } from '@angular/core';

@Component({
    selector: 'document-message',
    templateUrl: './document-message.component.html',
    styleUrls: ['./document-message.component.scss']
})
export class DocumentMessageComponent {
    @Input() public url?: string = '';

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

import { Component, Input } from '@angular/core';
import { ThreadMediaMessage } from '../../../../models/thread-message';

@Component({
    selector: 'document-message',
    templateUrl: './document-message.component.html',
    styleUrls: ['./document-message.component.scss']
})
export class DocumentMessageComponent {
    @Input() public media?: ThreadMediaMessage;
    @Input() public isBusinessUser: boolean = true;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

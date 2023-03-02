import { Component, Input } from '@angular/core';
import { ThreadMediaMessage } from '../../../../models/thread-message';

@Component({
    selector: 'audio-message',
    templateUrl: './audio-message.component.html',
    styleUrls: ['./audio-message.component.scss']
})
export class AudioMessageComponent {
    @Input() public media?: ThreadMediaMessage;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

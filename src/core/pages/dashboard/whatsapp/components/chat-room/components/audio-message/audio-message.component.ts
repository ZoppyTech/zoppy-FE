import { Component, Input } from '@angular/core';

@Component({
    selector: 'audio-message',
    templateUrl: './audio-message.component.html',
    styleUrls: ['./audio-message.component.scss']
})
export class AudioMessageComponent {
    @Input() public url: string = '';

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

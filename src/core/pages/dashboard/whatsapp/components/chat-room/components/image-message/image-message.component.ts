import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-message',
    templateUrl: './image-message.component.html',
    styleUrls: ['./image-message.component.scss']
})
export class ImageMessageComponent {
    @Input() public url: string = '';

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

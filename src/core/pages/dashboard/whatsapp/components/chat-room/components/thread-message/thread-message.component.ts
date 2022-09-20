import { Component, Input, OnInit } from '@angular/core';
import { ThreadMessage } from '../../../../models/thread-message';

@Component({
    selector: 'thread-message',
    templateUrl: './thread-message.component.html',
    styleUrls: ['./thread-message.component.scss']
})
export class ThreadMessageComponent implements OnInit {
    @Input() public thread: ThreadMessage = new ThreadMessage();
    @Input() public replyEnabled: boolean = false;
    @Input() public deleteEnabled: boolean = false;
    public isHovered: boolean = false;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

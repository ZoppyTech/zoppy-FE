import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'chat-loading',
    templateUrl: './chat-loading.component.html',
    styleUrls: ['./chat-loading.component.scss']
})
export class ChatLoadingComponent implements OnInit {
    @Input() public percent: number = 0;
    public readonly CHAT_LOADING_IMAGE_DIR: string = './../../../../../../assets/imgs/chat_loading.png';

    public constructor() {
        //no content
    }
    public ngOnInit(): void {
        //console.log('init');
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'welcome-chat',
    templateUrl: './welcome-chat.component.html',
    styleUrls: ['./welcome-chat.component.scss']
})
export class WelcomeChatComponent implements OnInit {
    public readonly WELCOME_ZOPPY_CHAT_IMAGE_DIR: string = './../../../../../../assets/imgs/welcome-zoppy-chat.png';

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        //console.log('init');
    }
}

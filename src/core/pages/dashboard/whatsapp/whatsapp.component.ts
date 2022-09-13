import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
    public readonly subcomponents = Subcomponents;
    public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    public conversationSelected: any = null;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}

export enum Subcomponents {
    ContactList = 'contact-list',
    ChatList = 'chat-list'
}

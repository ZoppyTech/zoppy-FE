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

    //TODO: Change to WhatsappChat
    public chatRoom: ChatRoom | null = null;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public onContactSelected(event: any): void {
        this.chatRoom = new ChatRoom();
        this.chatRoom.manager = new WhatsappManager();
        this.chatRoom.contact = new WhatsappContact();
        this.chatRoom.contact.name = event.name;
        this.chatRoom.contact.displayPhone = event.displayPhone;
    }
}

export enum Subcomponents {
    ContactList = 'contact-list',
    ChatList = 'chat-list'
}

export class ChatRoom {
    public manager: WhatsappManager | null = null;
    public contact: WhatsappContact | null = null;
    public messages: Array<any> = [];
}

export class WhatsappManager {
    public name: string = 'Admin';
    public displayPhone: string = '+55 31 98339-0869';
}

export class WhatsappContact {
    public name: string = 'Daniel Cardoso';
    public displayPhone: string = '+55 31 98399-7508';
}

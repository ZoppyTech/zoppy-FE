import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public readonly NEW_MESSAGE_IMAGE_DIR: string = './../../../../../../assets/imgs/new-message.png';
    public contacts: Array<ContactView> = [];

    public constructor() {
        this.contacts = [
            {
                name: 'Daniel Cardoso',
                lastMessage: 'Fala man, blz?',
                sentAt: 'hoje'
            },
            {
                name: 'Lucas Roscoe',
                lastMessage: 'Bora Catan hoje?',
                sentAt: 'ontem'
            },
            {
                name: 'Alexendre Kac',
                lastMessage: 'Fala man, blz?',
                sentAt: '09/09/2022'
            },
            {
                name: 'Joao Machado',
                lastMessage: 'Fala meu querido, tudo joia?',
                sentAt: 'hoje'
            },
            {
                name: 'Karolina',
                lastMessage: 'Ei Dan, tudo bem?',
                sentAt: 'hoje'
            },
            {
                name: 'Daniel Cardoso',
                lastMessage: 'Fala man, blz?',
                sentAt: 'hoje'
            },
            {
                name: 'Lucas Roscoe',
                lastMessage: 'Bora Catan hoje?',
                sentAt: 'ontem'
            },
            {
                name: 'Alexendre Kac',
                lastMessage: 'Fala man, blz?',
                sentAt: '09/09/2022'
            },
            {
                name: 'Joao Machado',
                lastMessage: 'Fala meu querido, tudo joia?',
                sentAt: 'hoje'
            },
            {
                name: 'Karolina',
                lastMessage: 'Ei Dan, tudo bem?',
                sentAt: 'hoje'
            },
            {
                name: 'Daniel Cardoso',
                lastMessage: 'Fala man, blz?',
                sentAt: 'hoje'
            },
            {
                name: 'Lucas Roscoe',
                lastMessage: 'Bora Catan hoje?',
                sentAt: 'ontem'
            },
            {
                name: 'Alexendre Kac',
                lastMessage: 'Fala man, blz?',
                sentAt: '09/09/2022'
            },
            {
                name: 'Joao Machado',
                lastMessage: 'Fala meu querido, tudo joia?',
                sentAt: 'hoje'
            },
            {
                name: 'Karolina',
                lastMessage: 'Ei Dan, tudo bem?',
                sentAt: 'hoje'
            },
            {
                name: 'Daniel Cardoso',
                lastMessage: 'Fala man, blz?',
                sentAt: 'hoje'
            },
            {
                name: 'Lucas Roscoe',
                lastMessage: 'Bora Catan hoje?',
                sentAt: 'ontem'
            },
            {
                name: 'Alexendre Kac',
                lastMessage: 'Fala man, blz?',
                sentAt: '09/09/2022'
            },
            {
                name: 'Joao Machado',
                lastMessage: 'Fala meu querido, tudo joia?',
                sentAt: 'hoje'
            },
            {
                name: 'Karolina',
                lastMessage: 'Ei Dan, tudo bem?',
                sentAt: 'hoje'
            }
        ];
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public newMessage(): void {
        //not implemented
    }
}

export class ContactView {
    public name: string = '';
    public lastMessage: string = '';
    public sentAt: string = '';
}

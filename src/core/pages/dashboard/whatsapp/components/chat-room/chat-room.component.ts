import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRoom } from '../../whatsapp.component';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
    @Input() public chatRoom: ChatRoom | null = null;
    @Output() public chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();
    public messages: Array<any> = [];
    public inputComponentParams: any = {
        errors: [],
        model: '',
        icon: 'icon-lock',
        placeholder: 'Escreva sua mensagem',
        title: '',
        type: 'password'
    };

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public sendMessage(): void {
        //not implemented
    }
}

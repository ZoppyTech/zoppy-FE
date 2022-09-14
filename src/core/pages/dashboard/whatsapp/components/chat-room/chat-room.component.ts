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
    public theadMessage: any = {
        text: ''
    };
    public loadingMessages: boolean = false;

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

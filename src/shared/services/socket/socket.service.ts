import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WppMessageEntity } from 'src/shared/models/entities/wpp-message.entity';
import { SocketConstants } from 'src/shared/utils/constants/socket.constants';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public constructor(private socket: Socket) {}

    public createMessage(wppMessage: MessageSent): void {
        this.socket.emit(SocketConstants.EVENTS.CREATE_MESSAGE, wppMessage);
    }

    public updateMessage(wppMessage: MessageSent): void {
        this.socket.emit(SocketConstants.EVENTS.UPDATE_MESSAGE, wppMessage);
    }

    public receiveMessage(): Observable<MessageSent> {
        return this.socket.fromEvent(SocketConstants.EVENTS.RECEIVE_MESSAGE);
    }
}

export interface MessageSent {
    type: MessageOperation;
    message: WppMessageEntity;
}

type MessageOperation = 'create' | 'update' | 'delete';

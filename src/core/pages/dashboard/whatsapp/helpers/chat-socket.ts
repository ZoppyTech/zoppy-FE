import { Injectable } from '@angular/core';
import { WebSocketService } from 'src/shared/services/websocket/websocket.service';
import { ChatSocketData } from '../models/chat-socket-data';
import { WebSocketConstants } from '@ZoppyTech/utilities';

@Injectable({
    providedIn: 'root'
})
export class ChatSocket {
    public webSocketService: WebSocketService | null = null;

    public declare onNewConversationCount: (message: any) => void;
    public declare onUpdate: (message: any) => void;
    public declare onReceive: (message: any) => void;
    public declare onTransferRoom: (message: any) => void;
    public declare onUpdateCurrentRoom: (message: any) => void;
    public declare onUpdateRoomManager: (message: any) => void;

    public setWebsocketService(wsService: WebSocketService) {
        this.webSocketService = wsService;
    }

    public connect(wsService: WebSocketService | null = null): void {
        try {
            if (!!wsService) this.setWebsocketService(wsService);
            this.webSocketService?.connect();
        } catch (exception: any) {
            throw new WebsocketServiceIsNullException();
        }
    }

    public listen(): void {
        if (!this.webSocketService) return;
        this.webSocketService.fromEvent<ChatSocketData>(WebSocketConstants.CHAT_EVENTS.RECEIVE).subscribe((socketData: ChatSocketData) => {
            debugger;
            const action: string = socketData.action;
            const response: any = socketData;

            switch (action) {
                case WebSocketConstants.CHAT_ACTIONS.NEW_CONVERSATION_COUNT:
                    this.onNewConversationCount(response);
                    break;
                case WebSocketConstants.CHAT_ACTIONS.UPDATE:
                    this.onUpdate(response);
                    break;
                case WebSocketConstants.CHAT_ACTIONS.RECEIVE:
                    this.onReceive(response);
                    break;
                case WebSocketConstants.CHAT_ACTIONS.CHAT_TRANSFER:
                    this.onTransferRoom(response);
                    break;
                case WebSocketConstants.CHAT_ACTIONS.UPDATE_CURRENT_CHAT_ROOM:
                    this.onUpdateCurrentRoom(response);
                    break;
                case 'get_room_manager':
                    this.onUpdateRoomManager(response);
                    break;
            }
        });
    }

    public disconnect(): void {
        if (!this.webSocketService) return;
        this.webSocketService.disconnect();
    }
}

export class WebsocketServiceIsNullException extends Error {
    public constructor(message?: string) {
        super(message);
    }
}

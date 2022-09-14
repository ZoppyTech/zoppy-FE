import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@lucarrloliveira/confirm-action';
import { ToastService } from '@lucarrloliveira/toast';
import { VisualIdentityService } from '@lucarrloliveira/visual-identity';
import { WppMessageEntity } from 'src/shared/models/entities/wpp-message.entity';
import { MessageSent, SocketService } from 'src/shared/services/socket/socket.service';
import { StyleUtil } from 'src/shared/utils/style.util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public constructor(
        public visualIdentityService: VisualIdentityService,
        public toast: ToastService,
        public confirmAction: ConfirmActionService,
        private readonly socketService: SocketService
    ) {}

    public messageCreated: string = '';
    public messageUpdated: string = '';

    public ngOnInit() {
        StyleUtil.setBaseColorPallete(this.visualIdentityService);
        this.initMockSocket();
    }

    private initMockSocket(): void {
        debugger;
        this.socketService.receiveMessage().subscribe((msg: MessageSent) => {
            // TODO: here should have the rules to define if this message should appear on this chat
            console.log('caiu no subscribe');
            switch (msg.type) {
                case 'create':
                    this.messageCreated = msg.message.id;
                    break;
                case 'update':
                    this.messageUpdated = msg.message.id;
                    break;
            }
        });
    }

    public create(): void {
        const msg: WppMessageEntity = new WppMessageEntity();
        msg.id = 'message created id';
        msg.type = 'create';
        this.socketService.createMessage({ message: msg, type: 'create' });
    }

    public update(): void {
        const msg: WppMessageEntity = new WppMessageEntity();
        msg.id = 'message updated id';
        msg.type = 'update';
        this.socketService.updateMessage({ message: msg, type: 'update' });
    }
}

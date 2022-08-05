import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'Zoppy';

    public constructor(private socket: Socket) {}

    public emitEvent() {
        this.socket.emit('msgToServer', 'teste');
    }
}

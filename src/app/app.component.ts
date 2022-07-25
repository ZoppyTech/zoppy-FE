import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public ngOnInit(): void {
        const socket: WebSocket = io(environment.apiUrl);
    }
    public title: string = 'Zoppy';
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket: Socket;
    public url: string = `${environment.apiUrl}`;

    public constructor(public readonly storage: Storage) {
        console.log('Dentro do construtor da service WebSocketService');
        this.socket = io(this.url, this.getSocketOptions());
        console.log(this.url);
        console.log(this.getSocketOptions());
        console.log(this.socket);
        console.log('### FIM ####');
    }

    public connect(channelName: string = ''): void {
        this.socket = io(`${this.url}/${channelName}`, this.getSocketOptions());
    }

    public disconnect(): any {
        return this.socket.disconnect();
    }

    public emit<T>(eventName: string, message: T): any {
        console.log('Emitindo evento: ' + eventName);
        console.log('Mensagem: ' + message);
        return this.socket.emit(eventName, message);
    }

    public fromEvent<T>(eventName: string): Observable<T> {
        return new Observable<T>((observer: any) => {
            this.socket.on(eventName, (data: T) => {
                observer.next(data);
            });
            return () => {
                this.disconnect();
            };
        });
    }

    private getSocketOptions(): any {
        const authorization: string = `Bearer ${this.storage.getToken()}`;
        return {
            reconnectionAttempts: 5,
            reconnectionDelay: 15000,
            reconnectionDelayMax: 60000,
            randomizationFactor: 0.1,
            withCredentials: true,
            extraHeaders: {
                Authorization: authorization
            }
        };
    }
}

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
    public url: string = environment.apiUrl;

    public constructor(public readonly storage: Storage) {
        this.socket = io(this.url, this.getSocketOptions());
    }

    public connect(channelName: string = ''): void {
        this.socket = io(`${this.url}/${channelName}`, this.getSocketOptions());
    }

    public disconnect(): any {
        return this.socket.disconnect();
    }

    public emit<T>(eventName: string, message: T): any {
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
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: authorization
                    }
                }
            }
        };
    }
}
import { TestBed, async, inject } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { WebSocketService } from './websocket.service';

describe('Service: Socket', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WebSocketService, { provide: Socket, useClass: SocketStub }]
        });
    });

    it('should ...', inject([WebSocketService], (service: WebSocketService) => {
        expect(service).toBeTruthy();
    }));
});

class SocketStub {}

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { SocketService } from './socket.service';

describe('Service: Socket', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SocketService, { provide: Socket, useClass: SocketStub }]
        });
    });

    it('should ...', inject([SocketService], (service: SocketService) => {
        expect(service).toBeTruthy();
    }));
});

class SocketStub {}

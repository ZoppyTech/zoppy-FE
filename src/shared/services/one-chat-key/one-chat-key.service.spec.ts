/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OneChatKeyService } from './one-chat-key.service';

describe('Service: OneChatKey', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [OneChatKeyService]
        });
    });

    it('should ...', inject([OneChatKeyService], (service: OneChatKeyService) => {
        expect(service).toBeTruthy();
    }));
});

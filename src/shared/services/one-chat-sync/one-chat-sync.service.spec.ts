/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OneChatSyncService } from './one-chat-sync.service';

describe('Service: ShopifySync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [OneChatSyncService]
        });
    });

    it('should ...', inject([OneChatSyncService], (service: OneChatSyncService) => {
        expect(service).toBeTruthy();
    }));
});

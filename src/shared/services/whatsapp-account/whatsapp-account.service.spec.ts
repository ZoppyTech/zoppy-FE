import { TestBed } from '@angular/core/testing';

import { WhatsappAccountService } from './whatsapp-account.service';

describe('WhatsappAccountService', () => {
    let service: WhatsappAccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WhatsappAccountService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

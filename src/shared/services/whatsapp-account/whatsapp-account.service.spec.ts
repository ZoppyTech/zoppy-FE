import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WhatsappAccountService } from './whatsapp-account.service';

describe('WhatsappAccountService', () => {
    let service: WhatsappAccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WhatsappAccountService);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappAccountService]
        });
    });

    it('should ...', inject([WhatsappAccountService], (service: WhatsappAccountService) => {
        expect(service).toBeTruthy();
    }));
});

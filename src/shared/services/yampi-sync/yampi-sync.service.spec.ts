import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappContactService } from '../whatsapp-contact/whatsapp-contact.service';

import { YampiSyncService } from './yampi-sync.service';

describe('YampiSyncService', () => {
    let service: YampiSyncService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappContactService]
        });
        service = TestBed.inject(YampiSyncService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

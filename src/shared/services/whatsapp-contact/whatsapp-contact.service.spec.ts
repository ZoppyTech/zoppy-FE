import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappContactService } from './whatsapp-contact.service';

describe('WhatsappContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappContactService]
        });
    });

    it('should ...', inject([WhatsappContactService], (service: WhatsappContactService) => {
        expect(service).toBeTruthy();
    }));
});

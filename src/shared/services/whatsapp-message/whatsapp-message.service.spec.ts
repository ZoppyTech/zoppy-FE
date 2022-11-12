import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappMessageService } from './whatsapp-message.service';

describe('WhatsappMessageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappMessageService]
        });
    });

    it('should ...', inject([WhatsappMessageService], (service: WhatsappMessageService) => {
        expect(service).toBeTruthy();
    }));
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappAccountPhoneNumberService } from './whatsapp-account-phone-number.service';

describe('WhatsappAccountPhoneNumberService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappAccountPhoneNumberService]
        });
    });

    it('should ...', inject([WhatsappAccountPhoneNumberService], (service: WhatsappAccountPhoneNumberService) => {
        expect(service).toBeTruthy();
    }));
});

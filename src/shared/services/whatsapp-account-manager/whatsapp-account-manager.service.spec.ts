import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappAccountManagerService } from './whatsapp-account-manager.service';

describe('WhatsappAccountManagerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappAccountManagerService]
        });
    });

    it('should ...', inject([WhatsappAccountManagerService], (service: WhatsappAccountManagerService) => {
        expect(service).toBeTruthy();
    }));
});

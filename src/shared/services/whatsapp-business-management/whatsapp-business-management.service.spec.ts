import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappBusinessManagementService } from './whatsapp-business-management.service';

describe('WhatsappBusinessManagementService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappBusinessManagementService]
        });
    });

    it('should ...', inject([WhatsappBusinessManagementService], (service: WhatsappBusinessManagementService) => {
        expect(service).toBeTruthy();
    }));
});

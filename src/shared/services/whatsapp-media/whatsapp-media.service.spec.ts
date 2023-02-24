import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappMediaService } from './whatsapp-media.service';

describe('WhatsappMediaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappMediaService]
        });
    });

    it('should ...', inject([WhatsappMediaService], (service: WhatsappMediaService) => {
        expect(service).toBeTruthy();
    }));
});

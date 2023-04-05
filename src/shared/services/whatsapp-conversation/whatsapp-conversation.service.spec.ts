import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WhatsappConversationService } from './whatsapp-conversation.service';

describe('WhatsappConversationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WhatsappConversationService]
        });
    });

    it('should ...', inject([WhatsappConversationService], (service: WhatsappConversationService) => {
        expect(service).toBeTruthy();
    }));
});

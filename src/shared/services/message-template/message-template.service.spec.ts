import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageTemplateService } from './message-template.service';

describe('MessageTemplateService', () => {
    let service: MessageTemplateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MessageTemplateService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(MessageTemplateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

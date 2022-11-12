/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WcWebhookService } from './wc-webhook.service';

describe('Service: WcWebhook', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WcWebhookService]
        });
    });

    it('should ...', inject([WcWebhookService], (service: WcWebhookService) => {
        expect(service).toBeTruthy();
    }));
});

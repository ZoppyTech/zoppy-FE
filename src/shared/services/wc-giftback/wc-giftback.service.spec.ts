/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WcGiftbackService } from './wc-giftback.service';

describe('Service: WcGiftback', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WcGiftbackService]
        });
    });

    it('should ...', inject([WcGiftbackService], (service: WcGiftbackService) => {
        expect(service).toBeTruthy();
    }));
});

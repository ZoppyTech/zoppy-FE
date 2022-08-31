/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WcGiftbackService } from './wc-giftback.service';

describe('Service: WcGiftback', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WcGiftbackService]
        });
    });

    it('should ...', inject([WcGiftbackService], (service: WcGiftbackService) => {
        expect(service).toBeTruthy();
    }));
});

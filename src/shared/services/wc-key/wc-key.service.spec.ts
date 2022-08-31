/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WcKeyService } from './wc-key.service';

describe('Service: WcKey', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WcKeyService]
        });
    });

    it('should ...', inject([WcKeyService], (service: WcKeyService) => {
        expect(service).toBeTruthy();
    }));
});

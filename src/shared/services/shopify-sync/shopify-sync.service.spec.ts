/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopifySyncService } from './shopify-sync.service';

describe('Service: ShopifySync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ShopifySyncService]
        });
    });

    it('should ...', inject([ShopifySyncService], (service: ShopifySyncService) => {
        expect(service).toBeTruthy();
    }));
});

/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifySyncService } from './shopify-sync.service';

describe('Service: ShopifySync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [ShopifySyncService]
        });
    });

    it('should ...', inject([ShopifySyncService], (service: ShopifySyncService) => {
        expect(service).toBeTruthy();
    }));
});

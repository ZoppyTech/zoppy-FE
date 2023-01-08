/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NuvemshopSyncService } from './nuvemshop-sync.service';

describe('Service: ShopifySync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NuvemshopSyncService]
        });
    });

    it('should ...', inject([NuvemshopSyncService], (service: NuvemshopSyncService) => {
        expect(service).toBeTruthy();
    }));
});

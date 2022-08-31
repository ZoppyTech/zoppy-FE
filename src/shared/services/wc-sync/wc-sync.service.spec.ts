/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WcSyncService } from './wc-sync.service';

describe('Service: WcSync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WcSyncService]
        });
    });

    it('should ...', inject([WcSyncService], (service: WcSyncService) => {
        expect(service).toBeTruthy();
    }));
});

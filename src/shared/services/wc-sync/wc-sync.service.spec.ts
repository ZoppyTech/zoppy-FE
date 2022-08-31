/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WcSyncService } from './wc-sync.service';

describe('Service: WcSync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WcSyncService]
        });
    });

    it('should ...', inject([WcSyncService], (service: WcSyncService) => {
        expect(service).toBeTruthy();
    }));
});

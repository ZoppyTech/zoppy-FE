import { TestBed } from '@angular/core/testing';

import { YampiSyncService } from './yampi-sync.service';

describe('YampiSyncService', () => {
    let service: YampiSyncService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(YampiSyncService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

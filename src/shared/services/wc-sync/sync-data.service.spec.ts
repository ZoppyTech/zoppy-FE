/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SyncDataService } from './sync-data.service';

describe('Service: WcSync', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [SyncDataService]
        });
    });

    it('should ...', inject([SyncDataService], (service: SyncDataService) => {
        expect(service).toBeTruthy();
    }));
});

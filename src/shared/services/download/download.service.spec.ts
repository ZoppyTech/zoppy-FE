/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DownloadService } from './download.service';

describe('Service: Download', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DownloadService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([DownloadService], (service: DownloadService) => {
        expect(service).toBeTruthy();
    }));
});

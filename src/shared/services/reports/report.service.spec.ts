/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportService } from './report.service';

describe('Service: Report', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReportService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([ReportService], (service: ReportService) => {
        expect(service).toBeTruthy();
    }));
});

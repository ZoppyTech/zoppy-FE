import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
    let service: DashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [DashboardService]
        });
        service = TestBed.inject(DashboardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

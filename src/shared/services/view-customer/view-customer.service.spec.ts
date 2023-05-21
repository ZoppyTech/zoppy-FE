import { TestBed } from '@angular/core/testing';

import { ViewCustomerService } from './view-customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewCustomerService', () => {
    let service: ViewCustomerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ViewCustomerService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
        service = TestBed.inject(ViewCustomerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

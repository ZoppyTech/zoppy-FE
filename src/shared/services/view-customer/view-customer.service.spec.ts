import { TestBed } from '@angular/core/testing';

import { ViewCustomerService } from './view-customer.service';

describe('ViewCustomerService', () => {
    let service: ViewCustomerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ViewCustomerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

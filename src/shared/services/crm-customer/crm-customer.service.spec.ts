/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrmCustomerService } from './crm-customer.service';

describe('Service: CrmCustomer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmCustomerService]
        });
    });

    it('should ...', inject([CrmCustomerService], (service: CrmCustomerService) => {
        expect(service).toBeTruthy();
    }));
});

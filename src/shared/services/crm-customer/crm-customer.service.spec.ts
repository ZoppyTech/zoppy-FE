/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmCustomerService } from './crm-customer.service';

describe('Service: CrmCustomer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmCustomerService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([CrmCustomerService], (service: CrmCustomerService) => {
        expect(service).toBeTruthy();
    }));
});

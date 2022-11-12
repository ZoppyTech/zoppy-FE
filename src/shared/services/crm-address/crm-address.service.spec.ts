/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmAddressService } from './crm-address.service';

describe('Service: CrmAddress', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmAddressService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([CrmAddressService], (service: CrmAddressService) => {
        expect(service).toBeTruthy();
    }));
});

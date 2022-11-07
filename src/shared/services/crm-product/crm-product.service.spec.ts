/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmProductService } from './crm-product.service';

describe('Service: CrmProduct', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [CrmProductService]
        });
    });

    it('should ...', inject([CrmProductService], (service: CrmProductService) => {
        expect(service).toBeTruthy();
    }));
});

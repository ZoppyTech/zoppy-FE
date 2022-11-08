/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmOrderService } from './crm-order.service';

describe('Service: CrmOrder', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmOrderService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([CrmOrderService], (service: CrmOrderService) => {
        expect(service).toBeTruthy();
    }));
});

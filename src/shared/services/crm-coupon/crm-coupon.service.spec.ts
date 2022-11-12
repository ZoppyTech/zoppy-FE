/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmCouponService } from './crm-coupon.service';

describe('Service: CrmCoupon', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmCouponService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([CrmCouponService], (service: CrmCouponService) => {
        expect(service).toBeTruthy();
    }));
});

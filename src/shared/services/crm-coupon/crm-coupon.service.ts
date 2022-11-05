import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CrmCouponResponse } from 'src/shared/models/responses/crm/crm-coupon.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmCouponService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-coupons`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async findByPhone(phone: string): Promise<CrmCouponResponse> {
        const promise: Promise<CrmCouponResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmCouponResponse>(`${this.url}/${phone}`).subscribe(
                (response: CrmCouponResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

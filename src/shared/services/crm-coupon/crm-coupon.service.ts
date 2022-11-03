import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmCouponService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-coupon`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }
}

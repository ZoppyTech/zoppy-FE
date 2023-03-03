import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CrmCouponResponse } from 'src/shared/models/responses/crm/crm-coupon.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

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

    public async upload(file: any): Promise<BooleanResponse> {
        const params: any = new FormData();
        params.append('file', file);

        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse, HttpParams>(`${this.url}/import`, params).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
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

    public async findByCode(code: string): Promise<CrmCouponResponse> {
        const promise: Promise<CrmCouponResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmCouponResponse>(`${this.url}/code/${code}`).subscribe(
                (response: CrmCouponResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findAllPaginated(filter: ZoppyFilter<CrmCouponResponse>): Promise<ZoppyFilter<CrmCouponResponse>> {
        const promise: Promise<ZoppyFilter<CrmCouponResponse>> = new Promise((resolve: any, reject: any) => {
            this.post<ZoppyFilter<CrmCouponResponse>, ZoppyFilter<CrmCouponResponse>>(`${this.url}/list`, filter).subscribe(
                (response: ZoppyFilter<CrmCouponResponse>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async downloadCsv(): Promise<any> {
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(`${this.url}/download`).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

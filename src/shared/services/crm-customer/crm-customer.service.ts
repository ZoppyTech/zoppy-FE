import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CrmCustomerDetailResponse } from 'src/shared/models/responses/crm/crm-customer.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmCustomerService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-customers`;

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

    public async findByPhone(phone: string): Promise<CrmCustomerDetailResponse> {
        const promise: Promise<CrmCustomerDetailResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmCustomerDetailResponse>(`${this.url}/${phone}`).subscribe(
                (response: CrmCustomerDetailResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

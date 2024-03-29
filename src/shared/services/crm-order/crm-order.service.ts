import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CrmOrderRequest } from 'src/shared/models/requests/crm/crm-order.request';
import { CrmOrderResponse } from 'src/shared/models/responses/crm/crm-order.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmOrderService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-order`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async upload(file: any): Promise<BooleanResponse[]> {
        const params: any = new FormData();
        params.append('file', file);

        const promise: Promise<BooleanResponse[]> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse[], HttpParams>(`${this.url}/import`, params).subscribe(
                (response: BooleanResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: CrmOrderRequest): Promise<CrmOrderResponse> {
        const promise: Promise<CrmOrderResponse> = new Promise((resolve: any, reject: any) => {
            this.post<CrmOrderResponse, CrmOrderRequest>(`${this.url}`, request).subscribe(
                (response: CrmOrderResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

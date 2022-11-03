import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CrmProductResponse } from 'src/shared/models/responses/crm/crm-product.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmProductService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-product`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async findAll(): Promise<CrmProductResponse[]> {
        const promise: Promise<CrmProductResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<CrmProductResponse[]>(`${this.url}`).subscribe(
                (response: CrmProductResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async upload(file: any): Promise<BooleanResponse> {
        const params: HttpParams = new HttpParams();
        params.append('file', file);
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse, HttpParams>(`${this.url}`, params).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

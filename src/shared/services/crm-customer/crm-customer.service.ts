import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageConfigTemplate } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { CrmCustomerRequest } from 'src/shared/models/requests/crm/crm-customer.request';
import { CrmCustomerDetailResponse, CrmCustomerResponse } from 'src/shared/models/responses/crm/crm-customer.response';
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
            this.get<CrmCustomerDetailResponse>(`${this.url}/phones/${phone}`).subscribe(
                (response: CrmCustomerDetailResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findWhatsappLink(id: string, linkTemplateId: MessageConfigTemplate): Promise<string> {
        const promise: Promise<string> = new Promise((resolve: any, reject: any) => {
            this.get<string>(`${this.url}/${id}/links/${linkTemplateId}`).subscribe(
                (response: string) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(id: string): Promise<CrmCustomerDetailResponse> {
        const promise: Promise<CrmCustomerDetailResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmCustomerDetailResponse>(`${this.url}/${id}`).subscribe(
                (response: CrmCustomerDetailResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: CrmCustomerRequest): Promise<CrmCustomerResponse> {
        const promise: Promise<CrmCustomerResponse> = new Promise((resolve: any, reject: any) => {
            this.post<CrmCustomerResponse, CrmCustomerRequest>(`${this.url}`, request).subscribe(
                (response: CrmCustomerResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, request: CrmCustomerRequest): Promise<CrmCustomerResponse> {
        const promise: Promise<CrmCustomerResponse> = new Promise((resolve: any, reject: any) => {
            this.put<CrmCustomerResponse, CrmCustomerRequest>(`${this.url}/${id}`, request).subscribe(
                (response: CrmCustomerResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroy(id: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

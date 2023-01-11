import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CrmProductRequest } from 'src/shared/models/requests/crm/crm-product.request';
import { CrmCategoryResponse } from 'src/shared/models/responses/crm/crm-category.response';
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

    public async findCategories(): Promise<CrmCategoryResponse[]> {
        const promise: Promise<CrmCategoryResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<CrmCategoryResponse[]>(`${this.url}/categories`).subscribe(
                (response: CrmCategoryResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(id: string): Promise<CrmProductResponse> {
        const promise: Promise<CrmProductResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmProductResponse>(`${this.url}/${id}`).subscribe(
                (response: CrmProductResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: CrmProductRequest): Promise<CrmProductResponse> {
        const promise: Promise<CrmProductResponse> = new Promise((resolve: any, reject: any) => {
            this.post<CrmProductResponse, CrmProductRequest>(`${this.url}`, request).subscribe(
                (response: CrmProductResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, request: CrmProductRequest): Promise<CrmProductResponse> {
        const promise: Promise<CrmProductResponse> = new Promise((resolve: any, reject: any) => {
            this.put<CrmProductResponse, CrmProductRequest>(`${this.url}/${id}`, request).subscribe(
                (response: CrmProductResponse) => resolve(response),
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

    public async findAllPaginated(filter: ZoppyFilter<CrmProductResponse>): Promise<ZoppyFilter<CrmProductResponse>> {
        const promise: Promise<ZoppyFilter<CrmProductResponse>> = new Promise((resolve: any, reject: any) => {
            this.post<ZoppyFilter<CrmProductResponse>, ZoppyFilter<CrmProductResponse>>(`${this.url}/list`, filter).subscribe(
                (response: ZoppyFilter<CrmProductResponse>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
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
}

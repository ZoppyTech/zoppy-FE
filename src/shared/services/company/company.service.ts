import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { CompanyRequest } from 'src/shared/models/requests/company/company.request';
import { PaymentRequest } from 'src/shared/models/requests/company/payment.request';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/companies`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async update(request: CompanyRequest): Promise<CompanyEntity> {
        const promise: Promise<CompanyEntity> = new Promise((resolve: any, reject: any) => {
            this.put<CompanyEntity, CompanyRequest>(`${this.url}`, request).subscribe(
                (response: CompanyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async updatePaymentMethod(request: PaymentRequest): Promise<CompanyEntity> {
        const promise: Promise<CompanyEntity> = new Promise((resolve: any, reject: any) => {
            this.put<CompanyEntity, PaymentRequest>(`${this.url}/payment-method`, request).subscribe(
                (response: CompanyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async updatePlan(plan: string): Promise<CompanyEntity> {
        const promise: Promise<CompanyEntity> = new Promise((resolve: any, reject: any) => {
            this.put<CompanyEntity, CompanyRequest>(`${this.url}/plan/${plan}`).subscribe(
                (response: CompanyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async find(): Promise<CompanyEntity> {
        const promise: Promise<CompanyEntity> = new Promise((resolve: any, reject: any) => {
            this.get<CompanyEntity>(`${this.url}/mine`).subscribe(
                (response: CompanyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async inactivate(): Promise<void> {
        const promise: Promise<void> = new Promise((resolve: any, reject: any) => {
            this.delete<any>(`${this.url}`).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

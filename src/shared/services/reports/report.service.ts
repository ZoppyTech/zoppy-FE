import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';
import { Router } from '@angular/router';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { ReportsGenderDistributionResponse } from 'src/shared/models/responses/reports/reports.gender.distribution.response';
import { ReportOverviewCardResponse } from 'src/shared/models/responses/reports/report-overview-card.response';
import { MonthlyInvoiceResponse } from 'src/shared/models/responses/reports/monthly-invoice.response';
import { ReportSaleByStateResponse } from 'src/shared/models/responses/reports/report-sale-by-state.response';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/reports`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async getCustomers(): Promise<Array<ReportCustomerResponse>> {
        const promise: Promise<Array<ReportCustomerResponse>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<ReportCustomerResponse>>(`${this.url}/customers`).subscribe(
                (response: Array<ReportCustomerResponse>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getGenderDistribuion(): Promise<ReportsGenderDistributionResponse> {
        const promise: Promise<ReportsGenderDistributionResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportsGenderDistributionResponse>(`${this.url}/gender-distribution`).subscribe(
                (response: ReportsGenderDistributionResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getSalesByState(): Promise<ReportSaleByStateResponse[]> {
        const promise: Promise<ReportSaleByStateResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<ReportSaleByStateResponse[]>(`${this.url}/sales-by-state`).subscribe(
                (response: ReportSaleByStateResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getOverviewCard(): Promise<ReportOverviewCardResponse> {
        const promise: Promise<ReportOverviewCardResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportOverviewCardResponse>(`${this.url}/overview-card`).subscribe(
                (response: ReportOverviewCardResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getMonthlyInvoices(): Promise<Array<MonthlyInvoiceResponse>> {
        const promise: Promise<Array<MonthlyInvoiceResponse>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<MonthlyInvoiceResponse>>(`${this.url}/gender-distribution`).subscribe(
                (response: Array<MonthlyInvoiceResponse>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

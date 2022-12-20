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
import { DailySalesResponse } from 'src/shared/models/responses/reports/daily-sales.response';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { Position } from 'src/shared/models/responses/reports/matrix-rfm.response';
import { ShoppingFrequencyResponse } from 'src/shared/models/responses/reports/shopping-frequency.response';
import { BuyerAgeResponse } from 'src/shared/models/responses/reports/buyer-age.response';

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

    public async getCustomers(request: GetReportRequest): Promise<Array<ReportCustomerResponse>> {
        const promise: Promise<Array<ReportCustomerResponse>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<ReportCustomerResponse>>(`${this.url}/customers/${request.period}`).subscribe(
                (response: Array<ReportCustomerResponse>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getBuyersAge(request: GetReportRequest): Promise<BuyerAgeResponse[]> {
        const promise: Promise<BuyerAgeResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<BuyerAgeResponse[]>(`${this.url}/buyers-age/${request.period}`).subscribe(
                (response: BuyerAgeResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getShoppingFrequency(request: GetReportRequest): Promise<ShoppingFrequencyResponse[]> {
        const promise: Promise<ShoppingFrequencyResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<ShoppingFrequencyResponse[]>(`${this.url}/shopping-frequency/${request.period}`).subscribe(
                (response: ShoppingFrequencyResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getGenderDistribuion(request: GetReportRequest): Promise<ReportsGenderDistributionResponse> {
        const promise: Promise<ReportsGenderDistributionResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportsGenderDistributionResponse>(`${this.url}/gender-distribution/${request.period}`).subscribe(
                (response: ReportsGenderDistributionResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getSalesByState(request: GetReportRequest): Promise<ReportSaleByStateResponse[]> {
        const promise: Promise<ReportSaleByStateResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<ReportSaleByStateResponse[]>(`${this.url}/sales-by-state/${request.period}`).subscribe(
                (response: ReportSaleByStateResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getOverviewCard(request: GetReportRequest): Promise<ReportOverviewCardResponse> {
        const promise: Promise<ReportOverviewCardResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportOverviewCardResponse>(`${this.url}/overview-card/${request.period}`).subscribe(
                (response: ReportOverviewCardResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getMonthlyInvoices(request: GetReportRequest): Promise<MonthlyInvoiceResponse> {
        const promise: Promise<MonthlyInvoiceResponse> = new Promise((resolve: any, reject: any) => {
            this.get<MonthlyInvoiceResponse>(`${this.url}/monthly-invoices/${request.period}`).subscribe(
                (response: MonthlyInvoiceResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getDailySales(request: GetReportRequest): Promise<DailySalesResponse> {
        const promise: Promise<DailySalesResponse> = new Promise((resolve: any, reject: any) => {
            this.get<DailySalesResponse>(`${this.url}/daily-sales/${request.period}`).subscribe(
                (response: DailySalesResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async downloadCustomers(period: ReportPeriod, position: Position): Promise<any> {
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(`${this.url}/customers/download/${period}/${position}`).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';
import { Router } from '@angular/router';
import { ReportsGenderDistributionResponse } from 'src/shared/models/responses/reports/reports.gender.distribution.response';
import { ReportOverviewCardResponse } from 'src/shared/models/responses/reports/report-overview-card.response';
import { MonthlyInvoiceResponse } from 'src/shared/models/responses/reports/monthly-invoice.response';
import { ReportSaleByStateResponse } from 'src/shared/models/responses/reports/report-sale-by-state.response';
import { DailySalesResponse } from 'src/shared/models/responses/reports/daily-sales.response';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { Position } from 'src/shared/models/responses/reports/matrix-rfm.response';
import { ShoppingFrequencyResponse } from 'src/shared/models/responses/reports/shopping-frequency.response';
import { BuyerAgeResponse } from 'src/shared/models/responses/reports/buyer-age.response';
import { AbcResponse } from 'src/shared/models/responses/reports/abc.response';
import { WcAddressEntity } from 'src/shared/models/entities/wc-address.entity';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { RfmRequest } from 'src/shared/models/requests/report/rfm.request';
import { RfmResponse } from 'src/shared/models/responses/reports/rfm.response';

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

    public async getBuyersAge(request: GetReportRequest): Promise<BuyerAgeResponse[]> {
        const promise: Promise<BuyerAgeResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<BuyerAgeResponse[]>(
                `${this.url}/buyers-age/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: BuyerAgeResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getShoppingFrequency(request: GetReportRequest): Promise<ShoppingFrequencyResponse[]> {
        const promise: Promise<ShoppingFrequencyResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<ShoppingFrequencyResponse[]>(
                `${this.url}/shopping-frequency/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: ShoppingFrequencyResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getGenderDistribuion(request: GetReportRequest): Promise<ReportsGenderDistributionResponse> {
        const promise: Promise<ReportsGenderDistributionResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportsGenderDistributionResponse>(
                `${this.url}/gender-distribution/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: ReportsGenderDistributionResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getSalesByState(request: GetReportRequest): Promise<ReportSaleByStateResponse[]> {
        const promise: Promise<ReportSaleByStateResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<ReportSaleByStateResponse[]>(
                `${this.url}/sales-by-state/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: ReportSaleByStateResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getOverviewCard(request: GetReportRequest): Promise<ReportOverviewCardResponse> {
        const promise: Promise<ReportOverviewCardResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ReportOverviewCardResponse>(
                `${this.url}/overview-card/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: ReportOverviewCardResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getMonthlyInvoices(request: GetReportRequest): Promise<MonthlyInvoiceResponse> {
        const promise: Promise<MonthlyInvoiceResponse> = new Promise((resolve: any, reject: any) => {
            this.get<MonthlyInvoiceResponse>(
                `${this.url}/monthly-invoices/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: MonthlyInvoiceResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getDailySales(request: GetReportRequest): Promise<DailySalesResponse> {
        const promise: Promise<DailySalesResponse> = new Promise((resolve: any, reject: any) => {
            this.get<DailySalesResponse>(
                `${this.url}/daily-sales/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: DailySalesResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getAbc(request: GetReportRequest, type: string): Promise<AbcResponse> {
        const promise: Promise<AbcResponse> = new Promise((resolve: any, reject: any) => {
            this.get<AbcResponse>(
                `${this.url}/abc/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}/${type}`
            ).subscribe(
                (response: AbcResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getNpsSupportGrade(request: GetReportRequest): Promise<number> {
        const promise: Promise<number> = new Promise((resolve: any, reject: any) => {
            this.get<number>(
                `${this.url}/nps-average/support-rating/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: number) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getNpsProductGrade(request: GetReportRequest): Promise<number> {
        const promise: Promise<number> = new Promise((resolve: any, reject: any) => {
            this.get<number>(
                `${this.url}/nps-average/product-rating/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: number) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getNpsRecommendationGrade(request: GetReportRequest): Promise<{ grade: string; count: number }[]> {
        const promise: Promise<{ grade: string; count: number }[]> = new Promise((resolve: any, reject: any) => {
            this.get<{ grade: string; count: number }[]>(
                `${this.url}/nps-average/recommendation-rating/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: { grade: string; count: number }[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getNpsAverage(request: GetReportRequest): Promise<number> {
        const promise: Promise<number> = new Promise((resolve: any, reject: any) => {
            this.get<number>(
                `${this.url}/nps-average/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: number) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async downloadCustomers(request: GetReportRequest): Promise<any> {
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(
                `${this.url}/customers/download/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}/${
                    request.position
                }`
            ).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getRfm(request: RfmRequest): Promise<RfmResponse> {
        const promise: Promise<RfmResponse> = new Promise((resolve: any, reject: any) => {
            this.post<RfmResponse, RfmRequest>(`${this.url}/rfm`, request).subscribe(
                (response: RfmResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async getCustomers(request: GetReportRequest): Promise<Array<ViewCustomerEntity>> {
        const promise: Promise<Array<ViewCustomerEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<ViewCustomerEntity>>(
                `${this.url}/customers/${request.startPeriod?.toISOString()}/${request.finishPeriod?.toISOString()}`
            ).subscribe(
                (response: Array<ViewCustomerEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}

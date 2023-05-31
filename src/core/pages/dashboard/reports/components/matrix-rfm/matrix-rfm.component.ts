import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { FileUtils, FormatUtils, MatrixRfmConstants } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { Pagination, ZoppyFilter } from 'src/shared/models/filter';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { Position } from 'src/shared/models/responses/reports/matrix-rfm.response';
import { Gender, RfmGrade, RfmResponse } from 'src/shared/models/responses/reports/rfm.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'matrix-rfm',
    templateUrl: './matrix-rfm.component.html',
    styleUrls: ['./matrix-rfm.component.scss']
})
export class MatrixRfmComponent implements OnInit, OnDestroy {
    public rfm: RfmResponse = {
        grade: new RfmGrade(),
        customers: new ZoppyFilter<ViewCustomerEntity>(),
        gender: new Gender(),
        salesByState: {}
    };
    public isLoading: boolean = true;
    public hasData: boolean = false;
    public loadingData: boolean = false;
    public filter: ZoppyFilter<ViewCustomerEntity> = this.initFilter();

    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    @Input() public reportRequest: GetReportRequest = new GetReportRequest();

    public constructor(public router: Router, private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public initFilter(): ZoppyFilter<ViewCustomerEntity> {
        return {
            pagination: {
                page: 1,
                pageSize: 9,
                totalPages: 0,
                totalRecords: 0
            } as Pagination,
            searchFields: ['firstName', 'lastName', 'fullName', 'phone'],
            searchText: '',
            orderBy: [
                {
                    property: 'fullName',
                    direction: 'ASC'
                }
            ],
            data: []
        };
    }

    public async downloadCustomers(): Promise<void> {
        const fileName: string = `${new Date().toLocaleDateString()}_customers.csv`;
        try {
            const file: any = await this.reportsService.downloadCustomers({
                startPeriod: (this.reportRequest as GetReportRequest).startPeriod,
                finishPeriod: (this.reportRequest as GetReportRequest).finishPeriod,
                position: this.reportRequest?.position as string
            });
            FileUtils.downloadBlob(fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async ngOnInit(): Promise<void> {
        await this.initializeData();
        this.setEvents();
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.filter.pagination.page = 1;
        this.filter.searchText = searchText;
        await this.fetchData();
    }

    public async onPaginationChanged(page: number): Promise<void> {
        this.filter.pagination.page = page;
        await this.fetchData();
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        setTimeout(() => {
            this.isLoading = false;
        });
    }

    public async fetchData(position?: Position): Promise<void> {
        try {
            this.loadingData = true;
            if (position && this.reportRequest.position === position) this.reportRequest.position = MatrixRfmConstants.STATE.ALL;
            else if (position) this.reportRequest.position = position;
            this.rfm = await this.reportsService.getRfm({
                ...this.filter,
                data: [],
                startPeriod: (this.reportRequest as GetReportRequest).startPeriod,
                finishPeriod: (this.reportRequest as GetReportRequest).finishPeriod,
                position: this.reportRequest?.position as string
            });
            this.filter.pagination = this.rfm.customers.pagination;
            this.hasData = this.rfm.customers.data.length > 0;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        } finally {
            this.isLoading = false;
            this.loadingData = false;
        }
    }

    public calculate(position: string): string {
        const value: number = parseInt((this.rfm as any).grade[position]);
        const roundValue: number = value / this.rfm.grade.total;
        const percent: string = FormatUtils.toPercent(roundValue * 100);
        return `${value} - ${percent}`;
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            (this.reportRequest as GetReportRequest).startPeriod = period.startPeriod;
            (this.reportRequest as GetReportRequest).finishPeriod = period.finishPeriod;
            this.filter = this.initFilter();
            await this.initializeData();
        });
    }

    public redirectToCustomerDetails(id: string): void {
        this.router.navigate([Navigation.routes.customerSocialMedia, id]);
    }
}

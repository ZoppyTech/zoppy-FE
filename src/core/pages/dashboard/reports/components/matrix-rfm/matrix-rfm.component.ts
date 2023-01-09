import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { Position } from 'src/shared/models/responses/reports/matrix-rfm.response';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';
import { FileUtils } from 'src/shared/utils/file.util';
import { FormatUtils } from 'src/shared/utils/format.util';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'matrix-rfm',
    templateUrl: './matrix-rfm.component.html',
    styleUrls: ['./matrix-rfm.component.scss']
})
export class MatrixRfmComponent implements OnInit, OnDestroy {
    public customers: Array<ReportCustomerResponseDto> = [];
    public customersFiltered: Array<ReportCustomerResponseDto> = [];
    public isLoading: boolean = true;
    public loadingDownload: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public positions: CustomerPositions = new CustomerPositions();
    public position: CustomerPosition = new CustomerPosition('all');
    @Input() public reportRequest: GetReportRequest = {
        period: 'all' as ReportPeriod
    };

    public constructor(public router: Router, private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public async downloadCustomers(): Promise<void> {
        const fileName: string = `${new Date().toLocaleDateString()}_coupons.csv`;
        this.loadingDownload = true;
        try {
            const file: any = await this.reportsService.downloadCustomers(this.reportRequest.period, this.position.position);
            FileUtils.downloadBlob(fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.loadingDownload = false;
        }
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async ngOnInit(): Promise<void> {
        await this.initializeData();
        this.setEvents();
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        this.isLoading = false;
    }

    public async fetchData(): Promise<void> {
        try {
            this.customers = (await this.reportsService.getCustomers(this.reportRequest)) as ReportCustomerResponseDto[];
            this.customersFiltered = Array.from(this.customers.values());
            this.setPositions();
            this.setFilter(this.position);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        } finally {
            this.isLoading = false;
        }
    }

    public setPositions(): void {
        this.resetPositions();
        this.customers.forEach((customer: ReportCustomerResponse) => {
            switch (customer.matrixRFM?.position) {
                case 'cant-lose':
                    this.positions.cantLose.phones.push(customer.phone);
                    break;
                case 'at-risk':
                    this.positions.atRisk.phones.push(customer.phone);
                    break;
                case 'loyal':
                    this.positions.loyal.phones.push(customer.phone);
                    break;
                case 'champion':
                    this.positions.champion.phones.push(customer.phone);
                    break;
                case 'need-attention':
                    this.positions.needAttention.phones.push(customer.phone);
                    break;
                case 'possible-loyal':
                    this.positions.possibleLoyal.phones.push(customer.phone);
                    break;
                case 'sleeping':
                    this.positions.sleeping.phones.push(customer.phone);
                    break;
                case 'almost-sleeping':
                    this.positions.almostSleeping.phones.push(customer.phone);
                    break;
                case 'promising':
                    this.positions.promising.phones.push(customer.phone);
                    break;
                case 'new':
                    this.positions.new.phones.push(customer.phone);
                    break;
            }
        });
    }

    public calculate(position: CustomerPosition): string {
        const percent: string = FormatUtils.toPercent(position.phones.length / this.customers.length);
        return `${position.phones.length} - ${percent}`;
    }

    public setFilter(position: CustomerPosition) {
        this.isLoading = true;
        if (position.position === this.position.position) {
            this.setFilterByAll();
            return;
        }
        this.position.position = position.position;
        setTimeout(() => {
            this.customersFiltered = this.customers.filter((customer: ReportCustomerResponseDto) => {
                return !(position.position !== 'all' && customer.matrixRFM?.position !== position.position);
            });
            this.isLoading = false;
        });
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
            this.reportRequest.period = period;
            await this.initializeData();
        });
    }

    public redirectToCustomerDetails(id: string): void {
        this.router.navigate([Navigation.routes.customerSocialMedia, id]);
    }

    private setFilterByAll(): void {
        this.position.position = 'all';
        setTimeout(() => {
            this.customersFiltered = this.customers.map((customer: ReportCustomerResponseDto) => {
                return customer;
            });
            this.isLoading = false;
        });
    }

    private resetPositions(): void {
        this.positions.cantLose.phones = [];
        this.positions.atRisk.phones = [];
        this.positions.loyal.phones = [];
        this.positions.champion.phones = [];
        this.positions.needAttention.phones = [];
        this.positions.possibleLoyal.phones = [];
        this.positions.sleeping.phones = [];
        this.positions.almostSleeping.phones = [];
        this.positions.promising.phones = [];
        this.positions.new.phones = [];
    }
}

class CustomerPositions {
    public cantLose: CustomerPosition = new CustomerPosition('cant-lose');
    public atRisk: CustomerPosition = new CustomerPosition('at-risk');
    public loyal: CustomerPosition = new CustomerPosition('loyal');
    public champion: CustomerPosition = new CustomerPosition('champion');
    public needAttention: CustomerPosition = new CustomerPosition('need-attention');
    public possibleLoyal: CustomerPosition = new CustomerPosition('possible-loyal');
    public sleeping: CustomerPosition = new CustomerPosition('sleeping');
    public almostSleeping: CustomerPosition = new CustomerPosition('almost-sleeping');
    public promising: CustomerPosition = new CustomerPosition('promising');
    public new: CustomerPosition = new CustomerPosition('new');
}

class CustomerPosition {
    public constructor(position: Position) {
        this.position = position;
    }
    public phones: Array<string> = [];
    public position: Position = 'all';
}

export class ReportCustomerResponseDto extends ReportCustomerResponse {
    public hidden: boolean = false;
}

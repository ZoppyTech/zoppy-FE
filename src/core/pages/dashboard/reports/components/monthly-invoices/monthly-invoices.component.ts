import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { MonthInvoice, MonthlyInvoiceResponse } from 'src/shared/models/responses/reports/monthly-invoice.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'app-monthly-invoices',
    templateUrl: './monthly-invoices.component.html',
    styleUrls: ['./monthly-invoices.component.scss']
})
export class MonthlyInvoicesComponent implements OnInit, OnDestroy {
    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public data: MonthlyInvoiceResponse = new MonthlyInvoiceResponse();
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];
    @Input() public reportRequest: GetReportRequest = {
        period: 30 as ReportPeriod
    };

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false,
        indexAxis: 'x',
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public chartLabels: string[] = [];
    public chartLegend: boolean = false;
    public chartData: any[] = [
        {
            type: 'line',
            label: 'Receita direta com a Zoppy',
            data: [],
            borderColor: '#7b3dff',
            pointBackgroundColor: '#7b3dff',
            pointBorderColor: '#7b3dff'
        },
        {
            type: 'bar',
            label: 'Faturamento mensal',
            data: [],
            backgroundColor: ['#E3D6FD']
        }
    ];

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async ngOnInit() {
        await this.initializeData();
        this.setEvents();
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        this.setLegends();
        this.isLoading = false;
    }

    public setLegends(): void {
        this.legends = [
            {
                value: 'Faturamento mensal',
                color: '#E3D6FD'
            },
            {
                value: 'Receita direta com a Zoppy',
                color: '#7B3DFF'
            }
        ];
    }

    public async fetchData(): Promise<void> {
        try {
            this.chartData[0].data = [];
            this.chartData[1].data = [];
            this.chartLabels = [];
            this.data = await this.reportService.getMonthlyInvoices(this.reportRequest);
            this.data.invoices.forEach((invoice: MonthInvoice) => {
                if (invoice.invoice > 0) {
                    this.chartLabels.push(invoice.name);
                    this.chartData[1].data.push(invoice.invoice);
                    this.chartData[0].data.push(invoice.zoppyInvoice as number);
                }
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
            this.reportRequest.period = period;
            await this.initializeData();
        });
    }
}

interface Legend {
    color: string;
    value: string;
}

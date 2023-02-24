import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { DateUtil } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { MonthlyInvoiceResponse } from 'src/shared/models/responses/reports/monthly-invoice.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'monthly-invoices',
    templateUrl: './monthly-invoices.component.html',
    styleUrls: ['./monthly-invoices.component.scss']
})
export class MonthlyInvoicesComponent implements OnInit, OnDestroy {
    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public data: MonthlyInvoiceResponse = new MonthlyInvoiceResponse();
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];
    @Input() public reportRequest?: GetReportRequest;

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
            backgroundColor: ['#CDD6FF']
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
                color: '#CDD6FF'
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
            this.data = await this.reportService.getMonthlyInvoices(this.reportRequest as GetReportRequest);
            for (const invoice in this.data.invoices) {
                const info: string[] = invoice.split(' / ');
                const label: string = `${DateUtil.getMonthName(parseInt(info[1]) - 1).substring(0, 3)}/${info[0].substring(2, 4)}`;
                this.chartLabels.push(label);
                this.chartData[1].data.push(this.data.invoices[invoice].invoice);
                this.chartData[0].data.push(this.data.invoices[invoice].zoppyInvoice as number);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            (this.reportRequest as GetReportRequest).startPeriod = period.startPeriod;
            (this.reportRequest as GetReportRequest).finishPeriod = period.finishPeriod;
            await this.initializeData();
        });
    }
}

interface Legend {
    color: string;
    value: string;
}

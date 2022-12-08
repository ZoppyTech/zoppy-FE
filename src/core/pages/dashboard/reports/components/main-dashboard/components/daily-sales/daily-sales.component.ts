import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { DailySale, DailySalesResponse } from 'src/shared/models/responses/reports/daily-sales.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'daily-sales',
    templateUrl: './daily-sales.component.html',
    styleUrls: ['./daily-sales.component.scss']
})
export class DailySalesComponent implements OnInit, OnDestroy {
    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];
    public data: DailySalesResponse = new DailySalesResponse();
    @Input() public reportRequest: GetReportRequest = {
        period: 'all' as ReportPeriod
    };

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false,
        indexAxis: 'x',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left'
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };
    public chartLabels: string[] = [];
    public chartLegend: boolean = false;
    public chartData: any[] = [
        {
            type: 'line',
            label: 'Ticket médio',
            yAxisID: 'y',
            data: [],
            borderColor: '#002E73',
            pointBackgroundColor: '#002E73',
            pointBorderColor: '#002E73'
        },
        {
            type: 'bar',
            label: 'Número de vendas',
            yAxisID: 'y1',
            data: [],
            backgroundColor: ['#00F8DF']
        }
    ];

    public async ngOnInit() {
        await this.initializeData();
        this.setEvents();
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        this.setLegends();
        this.isLoading = false;
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
            this.reportRequest.period = period;
            await this.initializeData();
        });
    }

    public setLegends(): void {
        this.legends = [
            {
                value: 'Número de vendas',
                color: '#00F8DF'
            },
            {
                value: 'Ticket médio',
                color: '#002E73'
            }
        ];
    }

    public async fetchData(): Promise<void> {
        try {
            this.resetData();
            this.data = await this.reportService.getDailySales(this.reportRequest);
            this.data.invoices.forEach((invoice: DailySale) => {
                this.chartLabels.push(invoice.name);
                this.chartData[1].data.push(invoice.sales);
                this.chartData[0].data.push(invoice.avgTicket);
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }

    private resetData(): void {
        this.chartLabels = [];
        this.chartData[0].data = [];
        this.chartData[1].data = [];
    }
}

interface Legend {
    color: string;
    value: string;
}

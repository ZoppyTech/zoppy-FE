import { Component, Input, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { BuyerAgeResponse } from 'src/shared/models/responses/reports/buyer-age.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'buyer-age-chart',
    templateUrl: './buyer-age-chart.component.html',
    styleUrls: ['./buyer-age-chart.component.scss']
})
export class BuyerAgeChartComponent {
    @Input() public reportRequest: GetReportRequest = {
        startPeriod: new Date(),
        finishPeriod: new Date()
    };

    public data: BuyerAgeResponse[] | undefined;
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public monthsOfYear: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    public canvas: any;
    public ctx: any;
    @ViewChild('DemographicDataBuyerAgeChart') public DemographicDataBuyerAgeChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setEvents();
    }

    public ngOnDestroy(): void {
        this.chart?.destroy();
        BroadcastService.dispose(this);
    }

    public async fetchChartData(): Promise<void> {
        try {
            this.data = await this.reportsService.getBuyersAge(this.reportRequest);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de compras por gênero');
        } finally {
            this.isLoading = false;
        }
    }

    public async ngAfterViewInit(): Promise<void> {
        this.isLoading = true;
        await this.fetchChartData();
        this.initializeChart();
    }

    public setChartDatasets(): void {
        this.chartLabels = [];
        this.chartData = [];
        if (!this.data) return;
        this.chartData = this.data.map((value: BuyerAgeResponse) => value.age);
        this.chartLabels = this.monthsOfYear;
    }

    public async initializeChart(): Promise<void> {
        this.isLoading = true;
        this.setChartDatasets();
        this.updateChartDatasets();
        this.isLoading = false;
        this.drawChart(true);
    }

    public createNewChartInstance(newInstance: boolean = true): Chart | null {
        if (this.chart && newInstance) this.chart.destroy();
        this.canvas = this.getChartReference();
        if (!this.canvas) return null;
        this.ctx = this.canvas.getContext('2d');
        return new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Idade do público comprador',
                        data: this.chartData,
                        backgroundColor: ['#68EAFF']
                    }
                ],
                labels: this.chartLabels
            },
            options: {
                indexAxis: 'x',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: []
        });
    }

    public getChartReference(): any {
        return this.DemographicDataBuyerAgeChart?.nativeElement ?? document.getElementById('DemographicDataBuyerAgeChart');
    }

    public updateChartDatasets(): void {
        if (!this.chart) return;
        this.chart.config.data.datasets[0].data = this.chartData;
        this.chart.config.data.labels = this.chartLabels;
    }

    public drawChart(newInstance: boolean = false): void {
        setTimeout(() => {
            if (!this.chart || newInstance) this.chart = this.createNewChartInstance();
            this.updateChartDatasets();
            this.chart?.update();
        }, 0);
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            this.reportRequest.startPeriod = period.startPeriod;
            this.reportRequest.finishPeriod = period.finishPeriod;
            this.isLoading = true;
            await this.fetchChartData();
            this.initializeChart();
        });
    }
}

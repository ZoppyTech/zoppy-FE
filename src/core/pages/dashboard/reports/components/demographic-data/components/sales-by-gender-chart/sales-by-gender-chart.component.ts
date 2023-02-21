import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { MathUtil } from '@ZoppyTech/utilities';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ReportsGenderDistributionResponse } from 'src/shared/models/responses/reports/reports.gender.distribution.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'sales-by-gender-chart',
    templateUrl: './sales-by-gender-chart.component.html',
    styleUrls: ['./sales-by-gender-chart.component.scss']
})
export class SalesByGenderChartComponent implements OnInit {
    @Input() public reportRequest: GetReportRequest = {
        startPeriod: new Date(),
        finishPeriod: new Date()
    };
    public data: ReportsGenderDistributionResponse | undefined;
    public legends: Legend[] = [];
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('DemographicDataGenderChart') public DemographicDataGenderChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setLegend();
        this.setEvents();
    }

    public ngOnDestroy(): void {
        this.chart?.destroy();
        BroadcastService.dispose(this);
    }

    public async fetchChartData(): Promise<void> {
        try {
            this.data = await this.reportsService.getGenderDistribuion(this.reportRequest);
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
        const total: number = this.data.male + this.data.female + this.data.notRegisted;
        this.chartData = [
            MathUtil.ruleOfThree(this.data.male, total),
            MathUtil.ruleOfThree(this.data.female, total),
            MathUtil.ruleOfThree(this.data.notRegisted, total)
        ];
        this.chartLabels = ['Masculino', 'Feminino', 'Não registrado'];
    }

    public async initializeChart(): Promise<void> {
        this.isLoading = true;
        this.setChartDatasets();
        this.updateChartDatasets();
        this.isLoading = false;
        this.drawChart(true);
    }

    public updateChartDatasets(): void {
        if (!this.chart) return;
        this.chart.config.data.datasets[0].data = this.chartData;
        this.chart.config.data.labels = this.chartLabels;
    }

    public createNewChartInstance(newInstance: boolean = true): Chart | null {
        if (this.chart && newInstance) this.chart.destroy();
        this.canvas = this.getChartReference();
        if (!this.canvas) return null;
        this.ctx = this.canvas.getContext('2d');
        return new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: 'Compras por gênero',
                        data: this.chartData,
                        backgroundColor: ['#68EAFF', '#FFB2FF', '#B6C0FF'],
                        cutout: '50%'
                    }
                ],
                labels: this.chartLabels
            },
            options: {
                layout: {
                    padding: 15
                },
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [
                {
                    id: 'rfmGenderChart',
                    afterDraw: (chart: any) => {
                        const { ctx, _active } = chart;
                        const { top, left, width, height } = chart.chartArea;
                        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
                            chart.getDatasetMeta(datasetIndex).data.forEach((datapoint: any, datapointIndex: number) => {
                                const { x, y } = datapoint.tooltipPosition();

                                const labelValue: number = chart.data.datasets[0].data[datapointIndex];

                                const halfWidth: number = width / 2;
                                const halfHeight: number = height / 2;

                                let hLineLength: number = 15;
                                let vLineLength: number = 20;
                                let eLineLength: number = 15;

                                if (width <= 256) {
                                    hLineLength = 10;
                                    vLineLength = 15;
                                    eLineLength = 10;
                                }

                                const xLine: number = x >= halfWidth ? x + hLineLength : x - hLineLength;
                                const yLine: number = y >= halfHeight ? y + vLineLength : y - vLineLength;
                                const extraLine: number = x >= halfWidth ? eLineLength : -eLineLength;

                                //Draw Line
                                const maxPercentage: number = 10;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(xLine, labelValue <= maxPercentage ? yLine : y);
                                ctx.lineTo(xLine + extraLine, labelValue <= maxPercentage ? yLine : y);

                                switch (dataset.backgroundColor[datapointIndex]) {
                                    case '#68EAFF':
                                        ctx.strokeStyle = '#1BBDFE';
                                        break;
                                    case '#FFB2FF':
                                        ctx.strokeStyle = '#CF85FF';
                                        break;
                                    case '#B6C0FF':
                                        ctx.strokeStyle = '#8995E8';
                                        break;
                                    default:
                                        ctx.strokeStyle = '#002E73';
                                        break;
                                }
                                ctx.stroke();

                                //Show Text
                                const textXPosition: string = x >= halfWidth ? 'left' : 'right';
                                const marginLeftOrRight: number = x >= halfWidth ? 5 : -5;
                                ctx.font = '1rem Inter';
                                ctx.fontWeight = 500;
                                ctx.textAlign = textXPosition;
                                ctx.fillStyle = ctx.strokeStyle;
                                ctx.textBaseline = 'middle';
                                const textFormatted: string = labelValue + '%';
                                ctx.fillText(textFormatted, xLine + extraLine + marginLeftOrRight, labelValue <= 10 ? yLine : y);
                            });
                        });
                    }
                }
            ]
        } as any);
    }

    public getChartReference(): any {
        return this.DemographicDataGenderChart?.nativeElement ?? document.getElementById('DemographicDataGenderChart');
    }

    public drawChart(newInstance: boolean = false): void {
        setTimeout(() => {
            if (!this.chart || newInstance) this.chart = this.createNewChartInstance();
            this.updateChartDatasets();
            this.chart?.update();
        }, 0);
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (startPeriod: Date, finishPeriod: Date) => {
            this.reportRequest.startPeriod = startPeriod;
            this.reportRequest.finishPeriod = finishPeriod;
            this.isLoading = true;
            await this.fetchChartData();
            this.initializeChart();
        });
    }

    public setLegend(): void {
        this.legends = [
            {
                value: 'Feminino',
                color: '#FFB2FF'
            },
            {
                value: 'Masculino',
                color: '#68EAFF'
            },
            {
                value: 'Não registrado',
                color: '#B6C0FF'
            }
        ];
    }
}

interface Legend {
    color: string;
    value: string;
}

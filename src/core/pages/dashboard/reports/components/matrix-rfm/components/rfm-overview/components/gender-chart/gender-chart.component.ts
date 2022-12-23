import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer.response';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'gender-chart',
    templateUrl: './gender-chart.component.html',
    styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {
    @Input() public data: ReportCustomerResponse[] = [];
    @Input() public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];
    public canvas: any;
    public ctx: any;
    @ViewChild('rfmGenderChart') public rfmGenderChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setLegend();
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes['isLoading'] && changes['isLoading'].currentValue === false) {
            this.initializeChart();
        }
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public setChartDatasets(): void {
        this.chartLabels = [];
        this.chartData = [];
        if (!this.data?.length) return;
        this.chartData = [this.filterGenderByType('M'), this.filterGenderByType('F'), this.filterGenderByUndefinedType()];
        this.chartLabels = ['Masculino', 'Feminino', 'Não registrado'];
    }

    public filterGenderByType(type: string): string {
        const genders: ReportCustomerResponse[] = this.data.filter((value: ReportCustomerResponse) => {
            return value.gender === type;
        });
        return this.ruleOfThree(genders.length);
    }

    public filterGenderByUndefinedType(): string {
        const genders: ReportCustomerResponse[] = this.data.filter((value: ReportCustomerResponse) => {
            return !value.gender || value.gender.trimEnd() === '' || (value.gender.trimEnd() !== 'M' && value.gender.trimEnd() !== 'F');
        });
        return this.ruleOfThree(genders.length);
    }

    public ruleOfThree(value: any): string {
        return ((value * 100) / this.data.length).toFixed(2);
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
                    padding: 30
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

                                const xLine: number = x >= halfWidth ? x + 10 : x - 10;
                                const yLine: number = y >= halfHeight ? y + 15 : y - 15;
                                const extraLine: number = x >= halfWidth ? 20 : -20;

                                //Draw Line
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(xLine, labelValue <= 10 ? yLine : y);
                                ctx.lineTo(xLine + extraLine, labelValue <= 10 ? yLine : y);

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
        return this.rfmGenderChart?.nativeElement ?? document.getElementById('rfmGenderChart');
    }

    public drawChart(newInstance: boolean = false): void {
        setTimeout(() => {
            if (!this.chart || newInstance) this.chart = this.createNewChartInstance();
            this.updateChartDatasets();
            this.chart?.update();
        }, 0);
    }

    public setEvents(): void {
        // BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
        //     this.reportRequest.period = period;
        //     await this.initializeChart();
        // });
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

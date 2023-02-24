import { Component, Input, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'consumer-nps-chart',
    templateUrl: './consumer-nps-chart.component.html',
    styleUrls: ['./consumer-nps-chart.component.scss']
})
export class ConsumerNpsChartComponent {
    @Input() public reportRequest?: GetReportRequest;

    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public gradeLabels: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    public gradeValues: { grade: string; count: number }[] = [];

    public canvas: any;
    public ctx: any;
    @ViewChild('consumerNpsChart') public consumerNpsChart: any;
    public declare chart: any;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setEvents();
        this.initializeChart();
    }

    public async fetchChartData(): Promise<void> {
        try {
            this.gradeValues = await this.reportsService.getNpsRecommendationGrade(this.reportRequest as GetReportRequest);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de média nível dos produtos');
        }
    }

    public async initializeChart(): Promise<void> {
        this.isLoading = true;
        await this.fetchChartData();
        this.isLoading = false;
        this.drawChart();
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            (this.reportRequest as GetReportRequest).startPeriod = period.startPeriod;
            (this.reportRequest as GetReportRequest).finishPeriod = period.finishPeriod;
            this.initializeChart();
        });
    }

    public drawChart(): void {
        setTimeout(() => {
            this.chart = this.createNewChartInstance();
            this.chart?.update();
        }, 0);
    }

    public createNewChartInstance() {
        this.canvas = this.consumerNpsChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'NPS dos consumidores',
                        data: this.gradeValues.map((value: { grade: string; count: number }) => value.count),
                        backgroundColor: ['#B6C0FF']
                    }
                ],
                labels: this.gradeLabels
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
            plugins: [
                {
                    id: 'consumerNpsChart',
                    afterDraw: (chart: Chart) => {
                        const { ctx, config, data, options } = chart;
                        const { top, bottom, left, right, width, height } = chart.chartArea;

                        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
                            chart.getDatasetMeta(datasetIndex).data.forEach((datapoint: any, datapointIndex: number) => {
                                chart.data.datasets[0].backgroundColor = this.getGradient(chart);
                            });
                        });

                        chart.update();
                    }
                }
            ]
        });
    }

    public getGradient(chart: any): any {
        const {
            ctx,
            chartArea: { top, bottom, left, right }
        } = chart;
        const gradientSegment: any = ctx.createLinearGradient(left, 0, right, 0);
        gradientSegment.addColorStop(0, '#EB0000');
        gradientSegment.addColorStop(0.4, '#FFAD4E');
        gradientSegment.addColorStop(1, '#30E1A1');
        return gradientSegment;
    }
}

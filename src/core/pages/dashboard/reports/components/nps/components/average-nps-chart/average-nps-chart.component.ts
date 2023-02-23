import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart, registerables } from 'chart.js';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'average-nps-chart',
    templateUrl: './average-nps-chart.component.html',
    styleUrls: ['./average-nps-chart.component.scss']
})
export class AverageNpsChartComponent implements OnInit {
    @Input() public reportRequest: GetReportRequest = {
        startPeriod: new Date(),
        finishPeriod: new Date()
    };

    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('averageNpsChart') public averageNpsChart: any;
    public average: number = -100;
    public declare chart: any;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setEvents();
        this.initializeChart();
    }

    public async fetchChartData(): Promise<void> {
        try {
            this.average = await this.reportsService.getNpsAverage(this.reportRequest);
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
        BroadcastService.subscribe(this, 'refresh-report', async (startPeriod: Date, finishPeriod: Date) => {
            this.reportRequest.startPeriod = startPeriod;
            this.reportRequest.finishPeriod = finishPeriod;
            this.initializeChart();
        });
    }

    public drawChart(): void {
        setTimeout(() => {
            this.chart = this.createNewChartInstance();
            this.chart?.update();
        }, 0);
    }

    public createNewChartInstance(): void {
        this.canvas = this.averageNpsChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: 'NPS médio',
                        data: [50, 25, 12.5, 12.5],
                        backgroundColor: ['#EB0000', '#FFAD4E', '#4D7EFF', '#30E1A1'],
                        cutout: '95%'
                    }
                ],
                labels: ['Valor corrente', 'Restante']
            },
            options: {
                needleValue: (this.average + 100) / 2,
                needleAverageValue: this.average,
                indexAxis: 'y',
                responsive: true,
                rotation: 270,
                circumference: 180,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [
                {
                    id: 'averageNpsChart',
                    afterDatasetDraw: (chart: any) => {
                        const { ctx, config, data, options } = chart;
                        const { top, bottom, left, right, width, height } = chart.chartArea;

                        ctx.save();

                        const needleValue: number = options.needleValue;
                        const needleAverageValue: number = options.needleAverageValue;
                        const dataTotal: number = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                        const angle: number = Math.PI + (1 / dataTotal) * needleValue * Math.PI;

                        const cx: number = width / 2;
                        const cy: number = chart._metasets[0].data[0].y;

                        console.log();

                        //needle
                        ctx.translate(cx, cy);
                        ctx.rotate(angle);
                        ctx.beginPath();
                        ctx.moveTo(0, -2);
                        ctx.lineTo(height - ctx.canvas.height / 3, 0);
                        ctx.lineTo(0, 2);
                        ctx.fillStyle = this.getNeedleColorByValue(needleValue);
                        ctx.fill();

                        //needle dot
                        ctx.translate(-cx, -cy);
                        ctx.beginPath();
                        ctx.arc(cx, cy, 5, 0, 10);
                        ctx.fill();
                        ctx.restore();

                        //Show Text
                        let xCenter: any = chart.getDatasetMeta(0).data[0].x;
                        let yCenter: any = chart.getDatasetMeta(0).data[0].y;
                        ctx.font = 'bold 1.25rem sans-serif';
                        ctx.fillStyle = this.getNeedleColorByValue(needleValue);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        ctx.fillText(needleValue < 50 ? '-' + needleAverageValue : needleAverageValue, cx, cy + 30);
                    }
                }
            ]
        } as any);
    }

    public getNeedleColorByValue(value: any): any {
        if (value < 50) {
            return '#EB0000';
        } else if (value < 75) {
            return '#FFAD4E';
        } else if (value < 86.5) {
            return '#4D7EFF';
        } else {
            return '#30E1A1';
        }
    }
}

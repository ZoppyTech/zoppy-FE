import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'consumer-nps-chart',
    templateUrl: './consumer-nps-chart.component.html',
    styleUrls: ['./consumer-nps-chart.component.scss']
})
export class ConsumerNpsChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('consumerNpsChart') public consumerNpsChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.consumerNpsChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'NPS dos consumidores',
                        data: [70, 30, 70, 100, 45, 11, 87, 78, 99, 8, 70, 30, 70, 100, 45, 11, 87, 78, 99, 8],
                        backgroundColor: ['#B6C0FF']
                    }
                ],
                labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
            },
            options: {
                indexAxis: 'y',
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
                    afterDatasetDraw: (chart: any) => {
                        const { ctx, config, data, options } = chart;
                        const { top, bottom, left, right, width, height } = chart.chartArea;
                        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
                            chart.getDatasetMeta(datasetIndex).data.forEach((datapoint: any, datapointIndex: number) => {
                                chart.data.datasets[0].backgroundColor = this.getGradient(chart);
                            });
                        });
                        ctx.save();
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

// const { ctx, chartArea } = context.chart;
// if (!chartArea) {
//     return null;
// }

// if (context.dataIndex === 0) {
//     return this.getGradient(context.chart);
// }

// return ['#B6C0FF'];

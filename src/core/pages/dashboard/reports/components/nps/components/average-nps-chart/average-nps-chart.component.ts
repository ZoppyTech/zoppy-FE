import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'average-nps-chart',
    templateUrl: './average-nps-chart.component.html',
    styleUrls: ['./average-nps-chart.component.scss']
})
export class AverageNpsChartComponent implements OnInit, AfterViewInit {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('averageNpsChart') public averageNpsChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.canvas = this.averageNpsChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: 'NPS médio',
                        data: [88, 12],
                        backgroundColor: ['#FFB2FF', '#f3f3f3']
                    }
                ],
                labels: ['Valor corrente', 'Restante']
            },
            options: {
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
                    beforeDraw: (chart: any) => {
                        const { ctx, data, options } = chart;
                        const { top, left, width, height } = chart.chartArea;
                        let xCenter: any = chart.getDatasetMeta(0).data[0].x;
                        let yCenter: any = chart.getDatasetMeta(0).data[0].y;
                        ctx.font = 'bold 3rem sans-serif';
                        ctx.fillStyle = '#FFB2FF';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data.datasets[0].data[0] + '%', xCenter, yCenter - 10);
                    }
                }
            ]
        });
    }
}

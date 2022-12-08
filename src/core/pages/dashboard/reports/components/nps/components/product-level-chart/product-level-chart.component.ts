import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'product-level-chart',
    templateUrl: './product-level-chart.component.html',
    styleUrls: ['./product-level-chart.component.scss']
})
export class ProductLevelChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('productLevelChart') public productLevelChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.productLevelChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: 'Média nível dos produtos',
                        data: [50, 50],
                        backgroundColor: ['#B6C0FF', '#f3f3f3']
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
                    id: 'productLevelChart',
                    beforeDraw: (chart: any) => {
                        const { ctx, data, options } = chart;
                        const { top, left, width, height } = chart.chartArea;
                        let xCenter: any = chart.getDatasetMeta(0).data[0].x;
                        let yCenter: any = chart.getDatasetMeta(0).data[0].y;
                        ctx.font = 'bold 3rem sans-serif';
                        ctx.fillStyle = '#B6C0FF';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data.datasets[0].data[0] + '%', xCenter, yCenter - 10);
                    }
                }
            ]
        });
    }
}

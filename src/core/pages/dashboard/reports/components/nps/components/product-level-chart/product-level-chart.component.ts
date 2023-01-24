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
                        label: 'NPS médio',
                        data: [40, 30, 30],
                        backgroundColor: ['#EB0000', '#FFAD4E', '#30E1A1'],
                        cutout: '95%'
                    }
                ],
                labels: ['Valor corrente', 'Restante']
            },
            options: {
                needleValue: 76,
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
                    afterDatasetDraw: (chart: any) => {
                        const { ctx, config, data, options } = chart;
                        const { top, bottom, left, right, width, height } = chart.chartArea;

                        ctx.save();

                        const needleValue: number = options.needleValue;
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
                        ctx.fillText(needleValue + '%', cx, cy + 30);
                    }
                }
            ]
        } as any);
    }

    public getNeedleColorByValue(value: any): any {
        const fortyPercent: any = 40;
        const thirtyPercent: any = 30;
        const seventyPercent: any = 70;
        if (value <= fortyPercent) {
            return '#EB0000';
        } else if (value <= seventyPercent) {
            return '#FFAD4E';
        } else {
            return '#30E1A1';
        }
    }
}

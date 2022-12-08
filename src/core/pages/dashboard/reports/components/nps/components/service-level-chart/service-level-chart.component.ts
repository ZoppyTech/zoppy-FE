import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'service-level-chart',
    templateUrl: './service-level-chart.component.html',
    styleUrls: ['./service-level-chart.component.scss']
})
export class ServiceLevelChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('serviceLevelChart') public serviceLevelChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.serviceLevelChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: 'Média nível do atendimento',
                        data: [70, 30],
                        backgroundColor: ['#68EAFF', '#f3f3f3']
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
                    id: 'serviceLevelChart',
                    beforeDraw: (chart: any) => {
                        const { ctx, data, options } = chart;
                        const { top, left, width, height } = chart.chartArea;
                        let xCenter: any = chart.getDatasetMeta(0).data[0].x;
                        let yCenter: any = chart.getDatasetMeta(0).data[0].y;
                        ctx.font = 'bold 3rem sans-serif';
                        ctx.fillStyle = '#68EAFF';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(data.datasets[0].data[0] + '%', xCenter, yCenter - 10);
                    }
                }
            ]
        });
    }
}

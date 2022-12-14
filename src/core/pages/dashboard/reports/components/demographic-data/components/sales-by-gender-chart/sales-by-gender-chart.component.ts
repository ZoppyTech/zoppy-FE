import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'sales-by-gender-chart',
    templateUrl: './sales-by-gender-chart.component.html',
    styleUrls: ['./sales-by-gender-chart.component.scss']
})
export class SalesByGenderChartComponent implements OnInit {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];
    public canvas: any;
    public ctx: any;
    @ViewChild('salesByGenderChart') public salesByGenderChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    public doughnutChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#B6C0FF', '#FFB2FF', '#68EAFF'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public doughnutChartLabels: string[] = ['a', 'b'];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartLegend: boolean = false;
    public doughnutChartData: any[] = [{ data: [40, 30, 30], label: 'Compras por gênero' }];
    public myPlugins: any[] = [
        {
            id: 'salesByGenderChart',
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
                                ctx.strokeStyle = '#0092D0';
                                break;
                            case '#FFB2FF':
                                ctx.strokeStyle = '#9D5AFF';
                                break;
                            case '#B6C0FF':
                                ctx.strokeStyle = '#7381D2';
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
    ];

    public ngOnInit(): void {
        this.setLegend();
    }

    public createNewChartInstance(newInstance: boolean = true): Chart | null {
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
            plugins: []
        } as any);
    }

    public getChartReference(): any {
        return this.salesByGenderChart?.nativeElement ?? document.getElementById('salesByGenderChart');
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

import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'abc-curve-chart',
    templateUrl: './abc-curve-chart.component.html',
    styleUrls: ['./abc-curve-chart.component.scss']
})
export class AbcCurveChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public canvas: any;
    public ctx: any;
    @ViewChild('abcCurveChart') public abcCurveChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.abcCurveChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Curva ABC por categoria',
                        data: [70, 30, 70, 100, 45, 11, 87, 78, 99, 8, 70, 30, 70, 100, 45, 11, 87, 78, 99, 8],
                        backgroundColor: ['#B6C0FF']
                    }
                ],
                labels: [
                    'Produto A',
                    'Produto B',
                    'Produto C',
                    'Produto D',
                    'Produto E',
                    'Produto F',
                    'Produto G',
                    'Produto H',
                    'Produto I',
                    'Produto J',
                    'Produto A',
                    'Produto B',
                    'Produto C',
                    'Produto D',
                    'Produto E',
                    'Produto F',
                    'Produto G',
                    'Produto H',
                    'Produto I',
                    'Produto j'
                ]
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
            plugins: []
        });
    }
}

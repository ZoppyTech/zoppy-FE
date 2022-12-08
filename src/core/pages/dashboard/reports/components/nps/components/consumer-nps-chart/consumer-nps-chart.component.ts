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
            plugins: []
        });
    }
}

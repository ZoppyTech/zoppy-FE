import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'shopping-frequency-chart',
    templateUrl: './shopping-frequency-chart.component.html',
    styleUrls: ['./shopping-frequency-chart.component.scss']
})
export class ShoppingFrequencyChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    //public dayOfWeek: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    public monthsOfYear: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    public canvas: any;
    public ctx: any;
    @ViewChild('DemographicDataShoppingFrequencyChart') public DemographicDataShoppingFrequencyChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.DemographicDataShoppingFrequencyChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Frequência de compras',
                        data: [70, 300, 70, 30, 700, 1000, 200, 12, 0, 712, 126, 71],
                        backgroundColor: ['#B6C0FF']
                    }
                ],
                labels: this.monthsOfYear
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

// export enum DayOfWeek {
//     Sunday = 0,
//     Monday = 1,
//     Tuesday = 2,
//     Wednesday = 3,
//     Thursday = 4,
//     Friday = 5,
//     Saturday = 6
// }

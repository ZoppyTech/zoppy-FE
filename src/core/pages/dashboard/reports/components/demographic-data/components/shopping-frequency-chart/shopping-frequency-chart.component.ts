import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'shopping-frequency-chart',
    templateUrl: './shopping-frequency-chart.component.html',
    styleUrls: ['./shopping-frequency-chart.component.scss']
})
export class ShoppingFrequencyChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'x',
        backgroundColor: ['#00F8DF'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [70, 300, 70, 30, 700, 1000, 200, 300, 70, 30, 500, 123], label: 'Frequência de compras' }];

    public ngOnInit(): void {}
}

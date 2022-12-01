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
        backgroundColor: ['#E3D6FD', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [70, 300, 70, 30, 70, 10000, 200, 30, 70, 30, 7000, 3], label: 'Frequência de compras' }];

    public ngOnInit(): void {}
}

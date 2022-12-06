import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'buyer-age-chart',
    templateUrl: './buyer-age-chart.component.html',
    styleUrls: ['./buyer-age-chart.component.scss']
})
export class BuyerAgeChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'x',
        backgroundColor: ['#68EAFF'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b', 'c', 'd'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [70, 30, 26, 134], label: 'Idade do público comprador' }];

    public ngOnInit(): void {}
}

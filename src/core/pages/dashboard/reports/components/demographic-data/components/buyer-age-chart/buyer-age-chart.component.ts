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
        backgroundColor: ['#E3D6FD', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [70, 30], label: 'Idade do público comprador' }];

    public ngOnInit(): void {}
}

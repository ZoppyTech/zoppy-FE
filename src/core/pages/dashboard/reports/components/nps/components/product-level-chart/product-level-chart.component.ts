import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'product-level-chart',
    templateUrl: './product-level-chart.component.html',
    styleUrls: ['./product-level-chart.component.scss']
})
export class ProductLevelChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public pieChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#B6C0FF', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public pieChartLabels: string[] = ['a', 'b'];
    public pieChartType: string = 'pie';
    public pieChartLegend: boolean = false;
    public pieChartData: any[] = [{ data: [50, 50], label: 'Média nível dos produtos' }];

    public ngOnInit(): void {}
}

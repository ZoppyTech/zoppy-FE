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
        backgroundColor: ['#CAD3E1', '#E3D6FD', '#D0F0FD', '##CAFDF8'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public pieChartLabels: string[] = ['a', 'b'];
    public pieChartType: string = 'pie';
    public pieChartLegend: boolean = false;
    public pieChartData: any[] = [{ data: [70, 80], label: 'Média nível dos produtos' }];

    public ngOnInit(): void {}
}

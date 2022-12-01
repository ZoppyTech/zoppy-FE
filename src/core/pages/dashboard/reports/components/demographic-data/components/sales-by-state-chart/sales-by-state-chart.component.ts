import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'sales-by-state-chart',
    templateUrl: './sales-by-state-chart.component.html',
    styleUrls: ['./sales-by-state-chart.component.scss']
})
export class SalesByStateChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#E3D6FD', '#f3f3f3', '#E3D6FD', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b', 'c', 'd'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [70, 30], label: 'Compras por estado' }];

    public ngOnInit(): void {}
}

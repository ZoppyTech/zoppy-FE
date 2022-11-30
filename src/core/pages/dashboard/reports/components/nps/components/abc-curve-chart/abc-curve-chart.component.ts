import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'abc-curve-chart',
    templateUrl: './abc-curve-chart.component.html',
    styleUrls: ['./abc-curve-chart.component.scss']
})
export class AbcCurveChartComponent {
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
    public barChartData: any[] = [{ data: [70, 30], label: 'NPS médio' }];

    public ngOnInit(): void {}
}

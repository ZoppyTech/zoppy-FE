import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'consumer-nps-chart',
    templateUrl: './consumer-nps-chart.component.html',
    styleUrls: ['./consumer-nps-chart.component.scss']
})
export class ConsumerNpsChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
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

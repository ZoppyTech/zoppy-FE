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
        backgroundColor: ['#00F8DF'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [
        { data: [70, 30, 70, 100, 45, 11, 87, 78, 99, 8, 70, 30, 70, 100, 45, 11, 87, 78, 99, 8], label: 'NPS médio' }
    ];

    public ngOnInit(): void {}
}

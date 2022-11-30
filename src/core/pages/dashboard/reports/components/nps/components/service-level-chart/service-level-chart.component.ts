import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'service-level-chart',
    templateUrl: './service-level-chart.component.html',
    styleUrls: ['./service-level-chart.component.scss']
})
export class ServiceLevelChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public pieChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#CAFDF8', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public pieChartLabels: string[] = ['a', 'b'];
    public pieChartType: string = 'pie';
    public pieChartLegend: boolean = false;
    public pieChartData: any[] = [{ data: [70, 30], label: 'Média nível do atendimento' }];

    public ngOnInit(): void {}
}

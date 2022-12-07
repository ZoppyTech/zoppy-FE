import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'average-nps-chart',
    templateUrl: './average-nps-chart.component.html',
    styleUrls: ['./average-nps-chart.component.scss']
})
export class AverageNpsChartComponent implements OnInit {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public pieChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#FFB2FF', '#f3f3f3'],
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public pieChartLabels: string[] = ['a', 'b'];
    public pieChartType: string = 'pie';
    public pieChartLegend: boolean = false;
    public pieChartData: any[] = [{ data: [88, 12], label: 'NPS médio' }];

    public ngOnInit(): void {}
}

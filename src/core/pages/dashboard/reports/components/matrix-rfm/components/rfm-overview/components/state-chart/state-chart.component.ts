import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'state-chart',
    templateUrl: './state-chart.component.html',
    styleUrls: ['./state-chart.component.scss']
})
export class StateChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public barChartOptions: any = {
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
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [], label: 'Compras por estado' }];

    // @Input() public reportRequest: GetReportRequest = {
    //     period: 30 as ReportPeriod
    // };
}

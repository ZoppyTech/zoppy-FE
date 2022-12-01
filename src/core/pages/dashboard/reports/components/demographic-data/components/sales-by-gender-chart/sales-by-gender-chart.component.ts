import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'sales-by-gender-chart',
    templateUrl: './sales-by-gender-chart.component.html',
    styleUrls: ['./sales-by-gender-chart.component.scss']
})
export class SalesByGenderChartComponent implements OnInit {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];

    public doughnutChartOptions: any = {
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
    public doughnutChartLabels: string[] = ['a', 'b'];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartLegend: boolean = false;
    public doughnutChartData: any[] = [{ data: [70, 30], label: 'Compras por gênero' }];

    public ngOnInit(): void {
        this.setLegend();
    }

    public setLegend(): void {
        this.legends = [
            {
                value: 'Feminino',
                color: '#E3D6FD'
            },
            {
                value: 'Masculino',
                color: '#D0F0FD'
            },
            {
                value: 'Não registrado',
                color: '#CAD3E1'
            }
        ];
    }
}

interface Legend {
    color: string;
    value: string;
}

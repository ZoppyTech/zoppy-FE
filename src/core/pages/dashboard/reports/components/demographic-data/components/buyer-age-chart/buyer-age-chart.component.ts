import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'buyer-age-chart',
    templateUrl: './buyer-age-chart.component.html',
    styleUrls: ['./buyer-age-chart.component.scss']
})
export class BuyerAgeChartComponent {
    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    //public dayOfWeek: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    public monthsOfYear: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    public canvas: any;
    public ctx: any;
    @ViewChild('DemographicDataBuyerAgeChart') public DemographicDataBuyerAgeChart: any;

    public ngOnInit(): void {}

    public ngAfterViewInit() {
        this.canvas = this.DemographicDataBuyerAgeChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Idade do público comprador',
                        data: [70, 30, 26, 134, 43, 9, 0, 65, 16, 74, 64, 12],
                        backgroundColor: ['#68EAFF']
                    }
                ],
                labels: this.monthsOfYear
            },
            options: {
                indexAxis: 'x',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: []
        });
    }
}

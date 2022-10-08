import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { ReportsGenderDistributionResponse } from 'src/shared/models/responses/reports/reports.gender.distribution.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'app-sales-by-gender',
    templateUrl: './sales-by-gender.component.html',
    styleUrls: ['./sales-by-gender.component.scss']
})
export class SalesByGenderComponent implements AfterViewInit {
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public doughnutChartOptions: any = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public doughnutChartLabels: string[] = [];
    public doughnutChartLegend: boolean = false;
    public doughnutChartData: any[] = [{ data: [], label: 'Compras por estado' }];
    public data: ReportsGenderDistributionResponse | undefined;
    public legends: Legend[] = [];

    public chart: any;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportsService.getGenderDistribuion();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de compras por gênero');
        } finally {
            this.isLoading = false;
        }
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.fetchData();
        this.setLegend();
        setTimeout(() => this.configureGender());
    }

    public configureGender(): void {
        this.chart = new Chart('sales-by-gender', {
            type: 'doughnut',
            data: {
                labels: ['Masculino', 'Feminino', 'Não registrado'],
                datasets: [
                    {
                        data: [this.data?.male, this.data?.female, this.data?.notRegisted],
                        backgroundColor: ['#D0F0FD', '#E3D6FD', '#CAD3E1']
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
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

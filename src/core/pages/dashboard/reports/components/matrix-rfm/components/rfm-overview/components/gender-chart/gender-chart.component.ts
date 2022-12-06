import { Component, Input } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { ReportsGenderDistributionResponse } from 'src/shared/models/responses/reports/reports.gender.distribution.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'gender-chart',
    templateUrl: './gender-chart.component.html',
    styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent {
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public doughnutChartOptions: any = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        backgroundColor: ['#B6C0FF', '#FFB2FF', '#68EAFF']
    };
    public doughnutChartLabels: string[] = [];
    public doughnutChartLegend: boolean = false;
    public doughnutChartData: any[] = [{ data: [], label: 'Compras por estado' }];
    public data: ReportsGenderDistributionResponse | undefined;
    public legends: Legend[] = [];
    @Input() public reportRequest: GetReportRequest = {
        period: 30 as ReportPeriod
    };

    public chart: any;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportsService.getGenderDistribuion(this.reportRequest);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de compras por gênero');
        } finally {
            this.isLoading = false;
        }
    }

    public async ngAfterViewInit(): Promise<void> {
        this.initializeData();
        this.setEvents();
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
            this.reportRequest.period = period;
            await this.initializeData();
        });
    }

    public configureGender(): void {
        this.doughnutChartData[0].data = [this.data?.male, this.data?.female, this.data?.notRegisted];
        this.doughnutChartLabels = ['Masculino', 'Feminino', 'Não registrado'];
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        this.setLegend();
        setTimeout(() => this.configureGender());
    }

    public setLegend(): void {
        this.legends = [
            {
                value: 'Feminino',
                color: '#FFB2FF'
            },
            {
                value: 'Masculino',
                color: '#68EAFF'
            },
            {
                value: 'Não registrado',
                color: '#B6C0FF'
            }
        ];
    }
}

interface Legend {
    color: string;
    value: string;
}

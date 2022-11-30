import { Component, Input } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { ReportSaleByStateResponse } from 'src/shared/models/responses/reports/report-sale-by-state.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'state-chart',
    templateUrl: './state-chart.component.html',
    styleUrls: ['./state-chart.component.scss']
})
export class StateChartComponent {
    public data: ReportSaleByStateResponse[] = [];
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

    @Input() public reportRequest: GetReportRequest = {
        period: 30 as ReportPeriod
    };

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async ngAfterViewInit(): Promise<void> {
        await this.initializeData();
        this.setEvents();
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData();
        setTimeout(() => this.buildChart());
    }

    public buildChart(): void {
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        this.data.forEach((saleState: ReportSaleByStateResponse) => {
            this.barChartLabels.push(saleState.state);
            this.barChartData[0].data.push(saleState.amount.toString());
        });
        this.isLoading = false;
    }

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportsService.getSalesByState(this.reportRequest);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de vendas por estado');
        }
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
            this.reportRequest.period = period;
            await this.initializeData();
        });
    }
}

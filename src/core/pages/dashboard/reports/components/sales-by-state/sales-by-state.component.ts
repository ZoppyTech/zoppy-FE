import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { ReportSaleByStateResponse } from 'src/shared/models/responses/reports/report-sale-by-state.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'app-sales-by-state',
    templateUrl: './sales-by-state.component.html',
    styleUrls: ['./sales-by-state.component.scss']
})
export class SalesByStateComponent implements AfterViewInit {
    public data: ReportSaleByStateResponse[] = [];
    public isLoading: boolean = true;
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

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public async ngAfterViewInit(): Promise<void> {
        await this.fetchData();
        setTimeout(() => this.buildChart());
    }

    public buildChart(): void {
        this.data.forEach((saleState: ReportSaleByStateResponse) => {
            this.barChartLabels.push(saleState.state);
            this.barChartData[0].data.push(saleState.amount.toString());
        });

        this.isLoading = false;
    }

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportsService.getSalesByState();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de vendas por estado');
        }
    }
}
